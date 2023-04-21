import AssignedBusinessSearchForm from "@components/Forms/Business/AssignedBusinessSearch";
import { businessFormSchema } from "@components/Selects/Business/businessFormSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useCallback, useContext } from "react";
import { BusinessContext } from "@contexts/businessContext";
import { Table } from "@components/Tables/Table";
import { TableColum } from "@components/Tables/Table/types";
import { ProfessionalContext } from "@contexts/professionalContext";

export default function Appointments() {
  const { assignedBusiness } = useContext(BusinessContext);
  const { professional } = useContext(ProfessionalContext);

  const searchForm = useForm<IAssignedBusinessSearchForm>({
    resolver: joiResolver(businessFormSchema),
  });

  const filters = searchForm.watch();

  const filterBusiness = useCallback((): Business[] => {
    const { name } = filters;

    return (
      assignedBusiness?.filter((business) =>
        business.name.toLowerCase().includes(name?.toLowerCase() || "")
      ) || []
    );
  }, [assignedBusiness, filters]);

  const filteredBusiness = filterBusiness();

  const handleOwnerName = (business: Business) => {
    const isOnwer = professional.id === business?.owner.id;
    return isOnwer ? "você" : business?.owner.name;
  };

  const columns: TableColum<Business>[] = [
    {
      label: "nome",
      dataKey: "name",
    },
    { label: "dono", render: handleOwnerName },
    { label: "criado", dataKey: "created", formatDate: true },
    {
      label: "",
      dataKey: "id",
      className: "flex-none w-16",
      render: () => ":",
    },
  ];

  return (
    <div className={clsx("flex w-full h-full flex-col gap-4 p-4")}>
      <AssignedBusinessSearchForm formHook={searchForm} />
      <Table.Root>
        <Table.Header columns={columns} />
        <Table.Body
          columns={columns}
          dataSource={filteredBusiness}
          identifierKey="id"
        />
      </Table.Root>
    </div>
  );
}
