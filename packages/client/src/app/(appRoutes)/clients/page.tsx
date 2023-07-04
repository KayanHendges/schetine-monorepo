"use client";

import { SearchClientsForm } from "@components/Forms/Clients/SearchClients";
import { Table } from "@components/Tables/Table";
import { TableColum } from "@components/Tables/Table/types";
import { ToastContext } from "@contexts/ToastContext";
import { listClients } from "@providers/api/clients";
import {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

export default function Page() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { notify } = useContext(ToastContext);

  const fetchClients = useCallback(async () => {
    setIsLoading(true);
    try {
      const { list } = await listClients();
      setClients(list);
    } catch (error) {
      notify({ header: "Falha ao buscar clientes" });
    }
    setIsLoading(true);
  }, [notify]);

  useLayoutEffect(() => {
    fetchClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo<TableColum<Client>[]>(
    () => [
      {
        label: "nome",
        dataKey: "name",
      },
      {
        label: "telefone",
        dataKey: "phone",
      },
      {
        label: "criado",
        dataKey: "created",
      },
    ],
    []
  );

  return (
    <div className="w-full flex flex-col">
      <SearchClientsForm />
      <Table.Root>
        <Table.Header columns={columns} />
        <Table.Body columns={columns} dataSource={clients} identifierKey="id" />
      </Table.Root>
    </div>
  );
}
