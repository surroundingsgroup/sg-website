import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { VERTICALS } from "./schemaTypes/project";

/**
 * Desk structure: one drag-to-reorder list of Projects per vertical, so the
 * team controls the order pieces appear in each vertical's portfolio wall.
 */
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Portfolio")
    .items([
      ...VERTICALS.map((v) =>
        orderableDocumentListDeskItem({
          type: "project",
          title: v,
          id: `projects-${v.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`,
          filter: "vertical == $vertical",
          params: { vertical: v },
          S,
          context,
        }),
      ),
      S.divider(),
      S.documentTypeListItem("project").title("All projects"),
    ]);
