import { Translate } from 'translate'

const freeTranslator = Translate({
  engine: 'google',
  from: 'en',
  cache: 24 * 60 * 60 * 1000,
})

const ignoredKeys = new Set(['brand', 'href', 'number'])
const maxConcurrentTranslations = 4

function collectStrings(value, path = [], entries = []) {
  if (typeof value === 'string') {
    entries.push({ path, value })
    return entries
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => collectStrings(item, [...path, index], entries))
    return entries
  }

  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => {
      if (!ignoredKeys.has(key)) {
        collectStrings(item, [...path, key], entries)
      }
    })
  }

  return entries
}

function setValueAtPath(target, path, value) {
  const [key, ...remainingPath] = path

  if (remainingPath.length === 0) {
    target[key] = value
    return
  }

  setValueAtPath(target[key], remainingPath, value)
}

export async function translateContent(content, targetLanguage) {
  const translatedContent = structuredClone(content)
  const entries = collectStrings(content)

  for (let index = 0; index < entries.length; index += maxConcurrentTranslations) {
    const batch = entries.slice(index, index + maxConcurrentTranslations)
    const translations = await Promise.all(
      batch.map(({ value }) =>
        freeTranslator(value, { from: 'en', to: targetLanguage }),
      ),
    )

    translations.forEach((translated, batchIndex) => {
      if (!translated.trim()) {
        throw new Error('The translation service returned an empty translation.')
      }

      setValueAtPath(
        translatedContent,
        batch[batchIndex].path,
        translated,
      )
    })
  }

  return translatedContent
}
