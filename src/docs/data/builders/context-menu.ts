import type { APISchema, KeyboardSchema } from '$docs/types';

const builder: APISchema = {
	title: 'createContextMenu',
	description: 'The configuration object passed to the `createContextMenu` builder function.',
	props: [
		{
			label: 'positioning',
			type: 'FloatingConfig',
			default: "placement: 'right'",
		},
		{
			label: 'arrowSize',
			type: 'number',
			default: '8',
		},
		{
			label: 'preventScroll',
			type: 'boolean',
			default: 'true',
		},
	],
};

const menu: APISchema = {
	title: 'menu',
	description: 'The element which wraps the entire dropdown menu.',
	dataAttributes: [
		{
			label: 'data-state',
			value: '`"open" | "closed"`',
		},
		{
			label: 'data-melt-context-menu',
			value: 'Present on the menu element.',
		},
	],
};

const trigger: APISchema = {
	title: 'trigger',
	description: 'The element which when right clicked inside, opens the context menu.',
	dataAttributes: [
		{
			label: 'data-melt-context-menu-trigger',
			value: 'Present on the trigger element',
		},
		{
			label: 'data-state',
			value: "`'open' | 'closed'`",
		},
	],
};

const arrow: APISchema = {
	title: 'arrow',
	description: 'An optional arrow element which points to the trigger.',
	dataAttributes: [
		{
			label: 'data-arrow',
			value: '`"true"`',
		},
		{
			label: 'data-melt-context-menu-arrow',
			value: 'Present on the arrow element',
		},
	],
};

const item: APISchema = {
	title: 'item',
	description: 'A basic menu item.',
	props: [
		{
			label: 'onSelect',
			type: '(event: Event) => void',
		},
	],
	dataAttributes: [
		{
			label: 'data-orientation',
			value: '`"vertical" | "horizontal"`',
		},
		{
			label: 'data-context-menu-item',
			value: 'Present on the item element',
		},
	],
};

const checkboxItem: APISchema = {
	title: 'checkboxItem',
	description: 'A checkbox menu item.',
	props: [
		{
			label: 'checked',
			type: 'Writable<boolean>',
		},
		{
			label: 'onSelect',
			type: 'function',
		},
	],
	dataAttributes: [
		{
			label: 'data-orientation',
			value: '`"vertical" | "horizontal"`',
		},
		{
			label: 'data-melt-context-menu-checkbox-item',
			value: 'Present on the checkbox item elements',
		},
	],
};

const radioGroupBuilder: APISchema = {
	title: 'createMenuRadioGroup',
	description: 'The configuration object passed to the `createMenuRadioGroup` builder function.',
	props: [
		{
			label: 'value',
			type: 'string',
		},
	],
};

const radioGroup: APISchema = {
	title: 'radioGroup',
	description: 'A group of radio menu items.',
	dataAttributes: [
		{
			label: 'data-melt-context-menu-radio-group',
			value: 'Present on the radio group element',
		},
	],
};

const radioItem: APISchema = {
	title: 'radioItem',
	description: 'A radiogroup menu item.',
	props: [
		{
			label: 'value',
			type: 'string',
		},
		{
			label: 'disabled',
			type: 'boolean',
			default: 'false',
		},
		{
			label: 'onSelect',
			type: '(event: Event) => void',
		},
	],
	dataAttributes: [
		{
			label: 'data-orientation',
			value: '`"vertical" | "horizontal"`',
		},
		{
			label: 'data-melt-context-menu-radio-item',
			value: 'Present on the radio item elements',
		},
	],
};

const separator: APISchema = {
	title: 'separator',
	description: 'A horizontal line which separates menu items.',
	dataAttributes: [
		{
			label: 'data-melt-context-menu-separator',
			value: 'Present on the separator element',
		},
	],
};

const submenuBuilder: APISchema = {
	title: 'createSubMenu',
	description: 'The configuration object passed to the `createDropdownSubMenu` builder function.',
	props: [
		{
			label: 'positioning',
			type: 'FloatingConfig',
			default: "placement: 'right'",
		},
		{
			label: 'disabled',
			type: 'boolean',
			default: 'false',
		},
	],
};

const submenu: APISchema = {
	title: 'submenu',
	description: 'A submenu element displayed when its trigger is selected.',
	dataAttributes: [
		{
			label: 'data-melt-context-menu-submenu',
			value: 'Present on the submenu element',
		},
		{
			label: 'data-state',
			value: '`"open" | "closed"`',
		},
	],
};

const subTrigger: APISchema = {
	title: 'subTrigger',
	description: 'A button which opens its associated submenu.',
	dataAttributes: [
		{
			label: 'data-melt-context-menu-subtrigger',
			value: 'Present on the subtrigger element',
		},
		{
			label: 'data-state',
			value: '`"open" | "closed"`',
		},
		{
			label: 'data-disabled',
			value: 'Present if the trigger is disabled',
		},
	],
};

const keyboard: KeyboardSchema = [
	{
		key: 'Space',
		behavior:
			'When focused on the `trigger`, opens the dropdown and focuses the first item. When focused on an `item`, selects the item.',
	},
	{
		key: 'Enter',
		behavior:
			'When focused on the `trigger`, opens the dropdown and focuses the first item. When focused on an `item`, selects the item.',
	},
	{
		key: 'ArrowDown',
		behavior:
			'When focused on the `trigger`, opens the dropdown and focuses the first item. When focused on an `item`, shifts focus to the next item.',
	},
	{
		key: 'ArrowUp',
		behavior: 'When focused on an `item`, shifts focus to the next item..',
	},
	{
		key: 'ArrowRight',
		behavior: 'When focused on a `subTrigger`, opens the `subMenu` and focuses the first item.',
	},
	{
		key: 'ArrowLeft',
		behavior:
			"When focused on within a `subMenu`, closes the submenu and shifts focus to that submenu's `subTrigger`.",
	},
	{
		key: 'Esc',
		behavior: 'Closes the dropdown menu and focuses the `trigger`.',
	},
];

const schemas = {
	builder,
	radioGroup,
	radioItem,
	radioGroupBuilder,
	checkboxItem,
	menu,
	arrow,
	item,
	trigger,
	keyboard,
	subTrigger,
	submenu,
	submenuBuilder,
	separator,
};

const features = [
	'Can be controlled or uncontrolled.',
	'Supports submenus with configurable reading direction.',
	'Customize menu positioning.',
	'Optionally render a pointing arrow.',
	'Fully managed focus.',
	'Full keyboard navigation.',
	'Typeahead support',
];

export const contextMenuData = {
	schemas,
	features,
};
