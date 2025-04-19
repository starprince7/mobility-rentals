import React, {
  ComponentProps,
  useRef,
  memo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { TextInput, Pressable, StyleProp, ViewStyle } from "react-native";
import { FancyText } from "./FancyText";
import { Control, Controller, FieldValues, FieldPath } from "react-hook-form";

interface Props<T extends FieldValues = FieldValues> {
  placeholder?: string;
  label: string;
  secureTextEntry?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  keyboardType?: ComponentProps<typeof TextInput>["keyboardType"];
  defaultValue?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  name?: FieldPath<T>;
  control?: Control<T>;
  rules?: Record<string, any>;
}

export interface FancyInputRef {
  focus: () => void;
  blur: () => void;
  getValue: () => string;
  setValue: (text: string) => void;
}

function FancyInputComponent<T extends FieldValues = FieldValues>(
  props: Props<T>,
  ref: React.Ref<FancyInputRef>
) {
  const {
    label,
    style,
    className = "",
    placeholder = "",
    keyboardType,
    secureTextEntry = false,
    defaultValue = "",
    value,
    onChangeText,
    control,
    name,
    rules,
  } = props;

  const textInputRef = useRef<TextInput>(null);

  // Styling classes
  const containerClassName = `border-2 border-zinc-200 rounded-full px-8 py-2 justify-center items-start ${className}`;
  const inputStyle = { fontFamily: "KumbhSansRegular" };
  const inputClassName =
    "pb-1.5 android:py-0 w-full placeholder:text-gray-300 ios:text-lg";
  const labelClassName =
    "bg-neutral-100 w-fit text-sm text-gray-500 font-semibold";

  // Expose imperative methods
  useImperativeHandle(ref, () => ({
    focus: () => textInputRef.current?.focus(),
    blur: () => textInputRef.current?.blur(),
    getValue: () => {
      return value !== undefined ? value : defaultValue;
    },
    setValue: (text: string) => {
      if (textInputRef.current) {
        textInputRef.current.setNativeProps({ text });
      }
      if (onChangeText) {
        onChangeText(text);
      }
    },
  }));

  const handleInputPress = () => {
    textInputRef.current?.focus();
  };

  // If using form control, render with Controller
  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue as any}
        render={({ field: { onChange, onBlur, value: fieldValue } }) => (
          <Pressable
            style={style}
            onPress={handleInputPress}
            className={containerClassName}
          >
            <FancyText className={labelClassName}>{label}</FancyText>
            <TextInput
              value={fieldValue}
              ref={textInputRef}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              style={inputStyle}
              className={inputClassName}
              onChangeText={(text) => {
                onChange(text);
                if (onChangeText) onChangeText(text);
              }}
              onBlur={onBlur}
            />
          </Pressable>
        )}
      />
    );
  }

  // Otherwise render as a controlled or uncontrolled component
  return (
    <Pressable
      style={style}
      onPress={handleInputPress}
      className={containerClassName}
    >
      <FancyText className={labelClassName}>{label}</FancyText>
      <TextInput
        value={value}
        defaultValue={value === undefined ? defaultValue : undefined}
        ref={textInputRef}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={inputStyle}
        className={inputClassName}
        onChangeText={onChangeText}
      />
    </Pressable>
  );
}

// Memoize the component with proper generic type handling
const ForwardedFancyInput = forwardRef(FancyInputComponent) as <
  T extends FieldValues = FieldValues
>(
  props: Props<T> & { ref?: React.Ref<FancyInputRef> }
) => React.ReactElement;

export const FancyInput = memo(ForwardedFancyInput);
