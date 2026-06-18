'use client'

import React from 'react'
import Select, {
  components,
  MultiValueRemoveProps,
  ClearIndicatorProps,
  OnChangeValue,
  ActionMeta,
} from 'react-select'

const TagsMultiValueRemove = (
  props: MultiValueRemoveProps<OptionType, true>
) => (
  <components.MultiValueRemove {...props}>
    <svg
      width="100%"
      height="100%"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
    >
      <path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z" />
    </svg>
  </components.MultiValueRemove>
)

const TagsClearIndicator = (props: ClearIndicatorProps<OptionType, true>) => (
  <components.ClearIndicator {...props}>
    <svg
      width="100%"
      height="100%"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
    >
      <path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z" />
    </svg>
  </components.ClearIndicator>
)

type TagSelectorProps = {
  options: OptionType[]
  value: OptionType[]
  onChange: (
    _newValue: OnChangeValue<OptionType, true>,
    _actionMeta: ActionMeta<OptionType>
  ) => void
}

export type OptionType = {
  value: number
  label: string
}

export default function TagSelector(props: TagSelectorProps) {
  const { options, value, onChange } = props

  return (
    <Select<OptionType, true>
      //menuIsOpen={true}
      isMulti
      unstyled
      placeholder=""
      noOptionsMessage={() => 'No matching tags.'}
      options={options}
      value={value}
      onChange={onChange}
      components={{
        MultiValueRemove: TagsMultiValueRemove,
        ClearIndicator: TagsClearIndicator,
        IndicatorSeparator: () => null,
        DropdownIndicator: () => null,
      }}
      //classNamePrefix="tags"
      classNames={{
        container: () => 'tags__container',
        control: () => 'tags__control',
        valueContainer: () => 'tags__value-container',
        indicatorsContainer: () => 'tags__indicators',
        menu: () => 'tags__menu',
        menuList: () => 'tags__menu-list',
        menuPortal: () => 'tags__menu-portal',
        group: () => 'tags__group',
        groupHeading: () => 'tags__group-heading',
        multiValue: () => 'tags__multi-value',
        multiValueLabel: () => 'tags__multi-value__label',
        multiValueRemove: () => 'tags__multi-value__remove',
        placeholder: () => 'tags__placeholder',
        singleValue: () => 'tags__single-value',
        input: () => 'tags__input',
        clearIndicator: () => 'tags__indicator tags__clear-indicator',
        dropdownIndicator: () => 'tags__indicator tags__dropdown-indicator',
        indicatorSeparator: () => 'tags__indicator-separator',
        loadingIndicator: () => 'tags__loading-indicator',
        loadingMessage: () => 'tags__loading-message',
        noOptionsMessage: () => 'tags__no-options-message',
        option: ({ isFocused, isSelected, isDisabled }) =>
          'tags__option' +
          (isFocused ? ' tags__option--is-focused' : '') +
          (isSelected ? ' tags__option--is-selected' : '') +
          (isDisabled ? ' tags__option--is-disabled' : ''),
      }}
      styles={{
        control: (base) => ({
          ...base,
          minHeight: '2.5em',
        }),
        menuList: (base) => ({
          ...base,
          maxHeight: '9.3em',
        }),
      }}
    />
  )
}
