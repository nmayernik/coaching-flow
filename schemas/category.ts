export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Title',
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
      title: 'Short Description',
      type: 'text',
      description: 'Brief description for admin reference (e.g. "Advice on saving/paying for college")',
    },
    {
      name: 'sectionDescription',
      title: 'Topic Selector Description',
      type: 'text',
      description: 'Description shown to users in the coaching form topic selector',
      placeholder: 'Our expert coaches specialize in this area to provide you with the most relevant guidance.',
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Name of the icon to display for this category',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this category should appear',
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this category is currently available',
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