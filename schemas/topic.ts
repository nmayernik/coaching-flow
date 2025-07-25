export default {
  name: 'topic',
  title: 'Topic',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Topic Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'supportingText',
      title: 'Supporting Text',
      type: 'text',
      description: 'Brief description shown under the topic in the selector',
    },
    {
      name: 'detailedDescription',
      title: 'Detailed Description',
      type: 'text',
      description: 'Full description of what this topic covers',
    },
    {
      name: 'isFeatured',
      title: 'Featured Topic',
      type: 'boolean',
      description: 'Whether this topic should be highlighted as "Most Popular"',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this topic should appear within its category',
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this topic is currently available',
      initialValue: true,
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags for categorizing and filtering topics',
    },
  ],
  preview: {
    select: {
      title: 'title',
      supportingText: 'supportingText',
      isFeatured: 'isFeatured',
    },
    prepare({ title, supportingText, isFeatured }: any) {
      return {
        title: isFeatured ? `⭐ ${title}` : title,
        subtitle: supportingText,
      }
    },
  },
} 