import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ButtonProps, CollapseProps, Stack } from "@mui/material";
import { Column, ColumnOrderState, Table, VisibilityState } from "@tanstack/react-table";
import { HTMLAttributes, ReactNode, useEffect, useState } from "react";

import { CloseSmallIcon, PlusSmallIcon } from "@/assets";

import MiniPillButton from "../MiniPillButton";
import TableInputsContainer from "../TableInputsContainer";

export type TableColumnsProps = {
  table: Table<any>;
  onOrderChange?: (value: ColumnOrderState) => void;
  onVisibilityChange?: (value: VisibilityState) => void;
} & CollapseProps;

const TableColumns = ({ table, onOrderChange, onVisibilityChange, ...props }: TableColumnsProps) => {
  const [items, setItems] = useState<Column<any>[]>(table.getAllLeafColumns());
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <TableInputsContainer unmountOnExit={false} {...props}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (!over) {
            return;
          }
          if (active.id !== over.id) {
            setItems((items) => {
              const oldIndex = items.findIndex((item) => {
                return item.id === active.id;
              });
              const newIndex = items.findIndex((item) => {
                return item.id === over.id;
              });
              const newItems = arrayMove(items, oldIndex, newIndex);
              table.setColumnOrder(
                newItems.map(({ id }) => {
                  return id;
                }),
              );
              onOrderChange?.(
                newItems.map(({ id }) => {
                  return id;
                }),
              );
              return newItems;
            });
          }
        }}
      >
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          <Stack direction="row" gap={1} flexWrap="wrap">
            {items.map(({ id, columnDef, getIsVisible, getCanHide, getToggleVisibilityHandler }) => {
              if (!getCanHide()) {
                return null;
              }
              return (
                <SortableItem key={id} uniqueId={id}>
                  <ColumnItemChip
                    label={columnDef.meta?.label}
                    isActive={getIsVisible()}
                    onChange={(value) => {
                      getToggleVisibilityHandler()({ target: { checked: value } });
                      // setTimeout(() => {
                      //   onVisibilityChange?.(table.getState().columnVisibility);
                      // });
                    }}
                  />
                </SortableItem>
              );
            })}
          </Stack>
        </SortableContext>
      </DndContext>
    </TableInputsContainer>
  );
};

const ColumnItemChip = ({
  label,
  isActive,
  onChange,
  onClick,
  ...props
}: { label: ReactNode; isActive?: boolean; onChange?: (value: boolean) => void } & ButtonProps) => {
  const [internalIsActive, setInternalIsActive] = useState(false);
  const Icon = internalIsActive ? CloseSmallIcon : PlusSmallIcon;

  useEffect(() => {
    setInternalIsActive(Boolean(isActive));
  }, [isActive]);

  return (
    <MiniPillButton
      variant={internalIsActive ? "outlined" : "contained"}
      color={internalIsActive ? "brown" : "lightBrown"}
      Icon={Icon}
      sx={{
        pl: "10px",
        border: internalIsActive ? undefined : "1px solid transparent",
      }}
      onClick={(event) => {
        setInternalIsActive((prev) => {
          onChange?.(!prev);
          return !prev;
        });
        onClick?.(event);
      }}
      {...props}
    >
      {label}
    </MiniPillButton>
  );
};

export const SortableItem = ({
  children,
  uniqueId,
  ...props
}: { uniqueId: UniqueIdentifier } & HTMLAttributes<HTMLDivElement>) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: uniqueId });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} {...props}>
      {children}
    </div>
  );
};

export default TableColumns;
