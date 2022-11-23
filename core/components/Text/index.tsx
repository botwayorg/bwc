import cn from "classnames";

const themeMap: any = {
  hero: "hero",
  heromd: "heroMd",
  large: "heading",
  medium: "medium",
  regular: "regular",
  small: "small",
};

export default function Text({
  tag = "h3",
  theme = "text",
  fancy = false,
  className,
  children,
  ...props
}: any) {
  const Tag = tag;
  return (
    <Tag
      className={cn("text", themeMap[theme], { fancy }, className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
