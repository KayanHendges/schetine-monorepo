import { businessFormSchema } from "@components/Selects/Business/businessFormSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useCallback, useContext, useState } from "react";
import { BusinessContext } from "@contexts/businessContext";
import { Table } from "@components/Tables/Table";
import { TableColum } from "@components/Tables/Table/types";
import { ProfessionalContext } from "@contexts/professionalContext";
import OptionButton from "@components/Buttons/Option";
import PopUpOptions from "@components/PopUps/PopUpOptions";
import { AssignedBusinessSearchForm } from "@components/Forms/Business/AssignedBusinessSearch";

export default function Appointments() {
  const { assignedBusiness } = useContext(BusinessContext);
  const { professional } = useContext(ProfessionalContext);

  const searchForm = useForm<IAssignedBusinessSearchForm>({
    resolver: joiResolver(businessFormSchema),
  });

  const filters = searchForm.watch();

  const filterBusiness = useCallback((): Business[] => {
    console.log({ filters });
    const { name } = filters;

    return (
      assignedBusiness?.filter((business) =>
        business.name.toLowerCase().includes(name?.toLowerCase() || "")
      ) || []
    );
  }, [assignedBusiness, filters]);

  const [openOptionIndex, setOpenOptionIndex] = useState<number | null>(null);

  const filteredBusiness = filterBusiness();

  console.log("render", filters.name);

  const handleOwnerName = (business: Business) => {
    const isOnwer = professional?.id === business?.owner?.id;
    return isOnwer ? "você" : business?.owner?.name;
  };

  const columns: TableColum<Business>[] = [
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
      render: (business, rowIndex) => {
        const matchIndex = rowIndex === openOptionIndex;
        return (
          <div className="relative">
            <OptionButton
              onClick={() => setOpenOptionIndex(matchIndex ? null : rowIndex)}
            />
            {matchIndex && (
              <PopUpOptions
                close={() => setOpenOptionIndex(null)}
                options={[
                  {
                    label: "editar",
                  },
                  {
                    label: "excluir",
                    className: "hover:bg-red-500",
                    value: business,
                    action: ({ value }) => console.log({ value }),
                  },
                ]}
              />
            )}
          </div>
        );
      },
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
