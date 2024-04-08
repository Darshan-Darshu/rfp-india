import { Suspense } from "react";
import { Inventory, columns } from "./table/columns";
import { DataTable } from "./table/DataTable";
import TableSkeleton from "./TableSkeleton";

type Props = {
  inventory: Inventory[] | null | undefined;
};

function InventoryCollection({ inventory }: Props) {
  return (
    <Suspense fallback={<TableSkeleton />}>
      {inventory && (
        <div className='max-w-[96vw] md:max-w-[60vw] mx-auto'>
          <DataTable
            columns={columns}
            data={inventory}
          />
        </div>
      )}
    </Suspense>
  );
}

export default InventoryCollection;
