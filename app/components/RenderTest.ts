import { h, defineComponent, type PropType } from 'vue'

 interface MenuItem {
  id: number;
  label: string;
  to: string;
  parentId: number | null;
  order: number;
  type: 'internal' | 'external' | 'anchor';
  children?: MenuItem[];
}

export default defineComponent({
  name: 'DynamicMenuButton',
  props: {
    items: {
      type: Array as PropType<MenuItem[]>,
      required: true
    }
  },
  setup(props) {
    const renderMenuItem = (item: MenuItem): VNode => {
      const children = item.children && item.children.length > 0
        ? h('ul', { class: 'md:absolute hidden group-hover:block bg-white shadow-md' }, 
            item.children.map(child => renderMenuItem(child)))
        : null;

      const link = h('a', {
        href: item.to,
        class: 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100',
        target: item.type === 'external' ? '_blank' : undefined
      }, item.label);

      return h('li', { class: 'relative group' }, [link, children]);
    };

    return () => h('nav', { class: 'bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800' },
      h('ul', { class: 'flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium' },
        props.items.map(item => renderMenuItem(item))
      )
    );
  }
});