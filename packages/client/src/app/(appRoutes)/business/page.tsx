"use client";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BusinessContext } from "@contexts/businessContext";
import { Table } from "@components/Tables/Table";
import { TableColum } from "@components/Tables/Table/types";
import { ProfessionalContext } from "@contexts/professionalContext";
import { AssignedBusinessSearchForm } from "@components/Forms/Business/AssignedBusinessSearch";
import { handleSubmit } from "@utils/form";
import { assignedBusinessSearchFormSchema } from "@components/Forms/Business/AssignedBusinessSearch/BussinessSearchForm";
import OptionsButton from "src/app/(appRoutes)/business/OptionsButton";

export default function Appointments() {
  const { assignedBusiness } = useContext(BusinessContext);
  const { professional } = useContext(ProfessionalContext);
  const [filteredBusiness, setFilteredBusiness] = useState<Business[]>([]);

  const searchForm = useForm<IAssignedBusinessSearchForm>({
    resolver: joiResolver(assignedBusinessSearchFormSchema),
  });

  const filterBusiness = useCallback(async () => {
    try {
      const { name } = await handleSubmit(searchForm);

      setFilteredBusiness(
        assignedBusiness?.filter((business) =>
          business.name.toLowerCase().includes(name?.toLowerCase() || "")
        ) || []
      );
    } catch (error) {}
  }, [assignedBusiness, searchForm]);

  const handleOwnerName = useCallback(
    (business: AssignedBusiness) => {
      const isOnwer = professional?.id === business.owner.id;
      return isOnwer ? "você" : business?.owner?.name;
    },
    [professional?.id]
  );

  const columns = useMemo<TableColum<Business>[]>(
    () => [
      {
        label: "nome",
        dataKey: "name",
      },
      { label: "dono", render: handleOwnerName },
      { label: "criado", dataKey: "created" },
      {
        label: "",
        dataKey: "id",
        className: "flex-none w-16",
        render: (business) => <OptionsButton business={business} />,
      },
    ],
    [handleOwnerName]
  );

  useEffect(() => {
    filterBusiness();
  }, [filterBusiness, assignedBusiness]);

  return (
    <div className="w-full">
      <AssignedBusinessSearchForm
        onSubmit={filterBusiness}
        formHook={searchForm}
      />
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
