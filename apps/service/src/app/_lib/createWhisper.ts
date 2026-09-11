'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/commons/prisma'
import { ensureAnonymousId } from '@/commons/anonymousUser'
import { fetchCurrentWeather } from '@/apis/weather'
import { DEFAULT_LOCATION_CODE, findLocation } from '@/constants/locations'
import { WhisperFormState } from '@/types/whisper'
import { MAX_CONTENT_LENGTH, WRITE_COOLDOWN_MS } from '@/constants/whisper'

const createWhisper = async (
  _prevState: WhisperFormState,
  formData: FormData,
): Promise<WhisperFormState> => {
  const content = String(formData.get('content') ?? '').trim()
  const locationCode = String(
    formData.get('locationCode') ?? DEFAULT_LOCATION_CODE,
  )

  if (!content) {
    return { status: 'error', message: '남기고 싶은 말을 적어주세요.' }
  }
  if (content.length > MAX_CONTENT_LENGTH) {
    return {
      status: 'error',
      message: `${MAX_CONTENT_LENGTH}자까지 적을 수 있어요.`,
    }
  }

  const location = findLocation(locationCode)
  if (!location) {
    return { status: 'error', message: '지역을 다시 선택해 주세요.' }
  }

  const authorId = ensureAnonymousId()

  const recentWhisper = await prisma.whisper.findFirst({
    where: {
      authorId,
      createdAt: { gte: new Date(Date.now() - WRITE_COOLDOWN_MS) },
    },
    select: { id: true },
  })
  if (recentWhisper) {
    return { status: 'error', message: '조금 쉬었다가 다시 남겨주세요.' }
  }

  // 날씨 없이 저장하면 이 서비스의 글로서 의미가 없으므로 작성을 막는다
  const weather = await fetchCurrentWeather(location)
  if (!weather) {
    return {
      status: 'error',
      message: '지금은 날씨를 가져올 수 없어요. 잠시 후 다시 시도해 주세요.',
    }
  }

  await prisma.whisper.create({
    data: {
      authorId,
      content,
      locationCode: location.code,
      locationName: location.name,
      weatherCode: weather.code,
      temperature: weather.temperature,
    },
  })

  revalidatePath('/')
  return { status: 'success', message: '속삭임을 남겼어요. 🌤️' }
}

export default createWhisper
