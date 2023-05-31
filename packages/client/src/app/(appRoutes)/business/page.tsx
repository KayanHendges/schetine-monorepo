"use client";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BusinessContext } from "@contexts/businessContext";
import { Table } from "@components/Tables/Table";
import { TableColum } from "@components/Tables/Table/types";
import { ProfessionalContext } from "@contexts/professionalContext";
import PopUpOptions from "@components/PopUps/PopUpOptions";
import { AssignedBusinessSearchForm } from "@components/Forms/Business/AssignedBusinessSearch";
import { handleSubmit } from "@utils/form";
import { assignedBusinessSearchFormSchema } from "@components/Forms/Business/AssignedBusinessSearch/BussinessSearchForm";
import ButtonBox from "@components/Buttons/Box";
import { DotsThreeVertical } from "phosphor-react";

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

  const [openOptionIndex, setOpenOptionIndex] = useState<number | null>(null);

  const handleOwnerName = useCallback(
    (business: Business) => {
      const isOnwer = professional?.id === business?.owner?.id;
      return isOnwer ? "você" : business?.owner?.name;
    },
    [professional?.id]
  );

  const columns: TableColum<Business>[] = useMemo(
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
        render: (business, rowIndex) => {
          const matchIndex = rowIndex === openOptionIndex;
          return (
            <div className="relative">
              <ButtonBox
                onClick={() => setOpenOptionIndex(matchIndex ? null : rowIndex)}
              >
                <DotsThreeVertical />
              </ButtonBox>
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
    ],
    [handleOwnerName, openOptionIndex]
  );

  useEffect(() => {
    filterBusiness();
  }, [filterBusiness]);

  return (
    <div className={clsx("flex w-full h-full flex-col gap-4 p-4")}>
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
