import AssignedBusinessSearchForm from "@components/Forms/Business/AssignedBusinessSearch";
import { businessFormSchema } from "@components/Selects/Business/businessFormSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import clsx from "clsx";

export default function Appointments() {
  // to do separate in form

  const searchForm = useForm<IAssignedBusinessSearchForm>({
    resolver: joiResolver(businessFormSchema),
  });

  return (
    <div className={clsx("w-full flex flex-col p-4")}>
      <AssignedBusinessSearchForm formHook={searchForm} />
    </div>
  );
}
