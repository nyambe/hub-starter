export enum MenuItemType {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
  ANCHOR = 'anchor',
}


export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Run database seed task'
  },
  async run() {
    console.log('Running DB seed task...')
		const menuItemsArray = [
			{
				label: 'Home',
				to: '/',
				parentId: null,
				order: 1,
				type: 'internal',
			},
			{
				label: 'About',
				to: '/about',
				parentId: null,
				order: 2,
				type: 'internal',
			},
			{
				label: 'Services',
				to: '/services',
				parentId: null,
				order: 3,
				type: 'internal',
			},
			{
				label: 'Web Design',
				to: '/services/web-design',
				parentId: 3,
				order: 1,
				type: 'internal',
			},
			{
				label: 'SEO',
				to: '/services/seo',
				parentId: 3,
				order: 2,
				type: 'internal',
			},
			{
				label: 'Portfolio',
				to: '/portfolio',
				parentId: null,
				order: 4,
				type: 'internal',
			},
			{
				label: 'Contact',
				to: '/contact',
				parentId: null,
				order: 5,
				type: 'internal',
			},
			{
				label: 'Blog',
				to: 'https://blog.example.com',
				parentId: null,
				order: 6,
				type: 'external',
			},
			{
				label: 'Terms of Service',
				to: '/terms#service',
				parentId: null,
				order: 7,
				type: 'anchor',
			},
			{
				label: 'Privacy Policy',
				to: '/terms#privacy',
				parentId: null,
				order: 8,
				type: 'anchor',
			},
		];
    await useDrizzle().insert(tables.menuItems).values(menuItemsArray)
    return { result: 'success' }
  }
})
