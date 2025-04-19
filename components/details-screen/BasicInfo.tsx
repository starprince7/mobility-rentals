import { FancyText, StackView } from "../ui";

type BasicInfoProp = {
  label: string;
  data: any;
  icon: () => React.JSX.Element;
};

export function BasicInfo({ label, data, icon }: BasicInfoProp) {
  if (!data) return null;
  return (
    <StackView direction="vertical" className="gap-2 items-center max-w-20">
      {icon()}
      <FancyText className=" text-neutral-500 text-sm">
        <FancyText className="text-black">{data || ""}</FancyText> {label}
      </FancyText>
    </StackView>
  );
}
