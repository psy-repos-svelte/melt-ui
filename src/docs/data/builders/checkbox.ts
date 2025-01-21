import { ATTRS, KBD, PROPS, SEE } from '$docs/constants.js';
import type { KeyboardSchema } from '$docs/types.js';
import { builderSchema, elementSchema } from '$docs/utils/index.js';
import { checkboxEvents } from '$lib/builders/checkbox/events.js';
import type { BuilderData } from './index.js';

/**
 * Props that are also returned in the form of stores via the `options` property.
 */
const OPTION_PROPS = [
	PROPS.DISABLED,
	PROPS.REQUIRED,
	{
		name: 'name',
		type: 'string',
		description:
			'The name of the checkbox. Submitted with its owning form as part of a name/value pair.',
	},
	{
		name: 'value',
		type: 'string',
		description: 'The value given as data when submitted with a `name`.',
	},
];

const builder = builderSchema('checkbox', {
	title: 'createCheckbox',
	props: [
		...OPTION_PROPS,
		{
			name: 'defaultChecked',
			type: ['boolean', '"indeterminate"'],
			default: 'false',
			description:
				'The default checked state of the checkbox. `"indeterminate"` is used to indicate that the checkbox is in an indeterminate state.',
		},
		{
			name: 'checked',
			type: 'Writable<boolean | "indeterminate">',
			description:
				'The controlled checked state store of the checkbox. If provided, this will override the value passed to `defaultChecked`.',
			see: SEE.BRING_YOUR_OWN_STORE,
		},
		{
			name: 'onCheckedChange',
			type: 'ChangeFn<boolean | "indeterminate">',
			description:
				'A callback called when the value of the `checked` store should be changed. This is useful for controlling the checked state of the checkbox from outside the checkbox.',
			see: SEE.CHANGE_FUNCTIONS,
		},
	],
	elements: [
		{
			name: 'root',
			description: 'The builder store used to create the checkbox root.',
			link: '#root',
		},
		{
			name: 'input',
			description: 'The builder store used to create the checkbox input.',
			link: '#input',
		},
	],
	states: [
		{
			name: 'checked',
			type: 'Writable<boolean | "indeterminate">',
			description: 'A writable store that contains the checked state of the checkbox.',
		},
	],
	helpers: [
		{
			name: 'isChecked',
			type: 'Readable<boolean>',
			description: 'A derived store that returns whether or not the checkbox is checked.',
		},
		{
			name: 'isIndeterminate',
			type: 'Readable<boolean>',
			description:
				'A derived store that returns whether or not the checkbox is in an indeterminate state.',
		},
	],
	options: OPTION_PROPS,
});

const root = elementSchema('root', {
	description: 'The checkbox element.',
	dataAttributes: [
		{
			name: 'data-disabled',
			value: ATTRS.DISABLED(),
		},
		{
			name: 'data-state',
			value: ATTRS.CHECKBOX_STATE,
		},
		{
			name: 'data-melt-checkbox',
			value: ATTRS.MELT('checkbox'),
		},
	],
	events: checkboxEvents['root'],
});

const input = elementSchema('input', {
	description: 'The native input element.',
	dataAttributes: [
		{
			name: 'data-melt-checkbox-hidden-input',
			value: ATTRS.MELT('checkbox input'),
		},
	],
});

const keyboard: KeyboardSchema = [
	{
		key: KBD.SPACE,
		behavior: 'Toggles the checkbox state.',
	},
];

const schemas = [builder, root, input];

const features = [
	'Supports indeterminate state',
	'Full keyboard navigation',
	'Can be controlled or uncontrolled',
];

export const checkboxData: BuilderData = {
	schemas,
	features,
	keyboard,
};
