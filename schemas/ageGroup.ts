export default {
  name: 'ageGroup',
  title: 'Age Group',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Age Group Title',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of this age group',
    },
    {
      name: 'minAge',
      title: 'Minimum Age',
      type: 'number',
      description: 'Minimum age in years (0 for prenatal)',
    },
    {
      name: 'maxAge',
      title: 'Maximum Age',
      type: 'number',
      description: 'Maximum age in years (null for postgraduate)',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this age group should appear',
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this age group is currently available',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare({ title, description }: any) {
      return {
        title,
        subtitle: description,
      }
    },
  },
} 