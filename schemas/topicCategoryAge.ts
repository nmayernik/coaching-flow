export default {
  name: 'topicCategoryAge',
  title: 'Topic-Category-Age Relationship',
  type: 'document',
  fields: [
    {
      name: 'topic',
      title: 'Topic',
      type: 'reference',
      to: [{ type: 'topic' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'ageGroups',
      title: 'Available Age Groups',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'ageGroup' }] }],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this relationship is currently available',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this topic should appear within this category for these age groups',
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Internal notes about this relationship',
    },
  ],
  preview: {
    select: {
      topicTitle: 'topic.title',
      categoryTitle: 'category.title',
      ageGroupCount: 'ageGroups',
    },
    prepare({ topicTitle, categoryTitle, ageGroupCount }: any) {
      return {
        title: topicTitle,
        subtitle: `${categoryTitle} • ${ageGroupCount?.length || 0} age groups`,
      }
    },
  },
} 