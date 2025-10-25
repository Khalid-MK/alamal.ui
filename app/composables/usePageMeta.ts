/**
 * Composable for managing page metadata (title, description, and other meta tags)
 * Uses i18n for translated titles and descriptions
 *
 * @example
 * // Simple usage with title and description
 * usePageMeta('pageTitles.home', 'pageDescriptions.home')
 *
 * // With additional meta tags
 * usePageMeta('pageTitles.faqs', 'pageDescriptions.faqs', {
 *   meta: [
 *     { name: 'keywords', content: 'FAQ, Quran, Islamic education' }
 *   ]
 * })
 *
 * // With dynamic title (for course details, etc.)
 * const courseName = ref('Tajweed Course')
 * usePageMeta(
 *   computed(() => t('pageTitles.courseDetails', { courseName: courseName.value })),
 *   'pageDescriptions.courseDetails'
 * )
 */

export const usePageMeta = (
  titleKey: string | ComputedRef<string>,
  descriptionKey?: string,
  additionalOptions?: {
    meta?: Array<{ name: string; content: string }>;
    link?: Array<{ rel: string; href: string }>;
  }
) => {
  const { t } = useI18n()

  // Handle both static strings and computed refs for title
  const pageTitle = typeof titleKey === 'string'
    ? t(titleKey)
    : titleKey.value

  // Build meta tags array
  const metaTags = [
    ...(descriptionKey ? [{
      name: 'description',
      content: t(descriptionKey)
    }] : []),
    ...(additionalOptions?.meta || [])
  ]

  // Apply head configuration
  useHead({
    title: pageTitle,
    meta: metaTags,
    link: additionalOptions?.link || []
  })
}
