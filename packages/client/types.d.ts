import { UseFormReturn, Path } from "react-hook-form";

type NestedKeyOf<ObjectType extends object> = 
{[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object 
? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
: `${Key}`
}[keyof ObjectType & (string | number)];

interface FormRef<T = Record<string, any>> extends UseFormReturn<T> {
  name: Path<T>;
}
