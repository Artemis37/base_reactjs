import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'

const Table = (props) => {
  const {
    data,
    column,
    header,
    onSearch,
    skip,
    total,
    lazy,
    setPaging,
    selected,
    setSelected,
  } = props
  let { take, paginator, config } = props

  take = take || 10
  paginator = paginator !== false
  config = config || {}

  const tblHeader = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">{header}</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => onSearch && onSearch(e)} placeholder="Tìm..." />
      </span>
    </div>
  )

  return (
    <>
      <DataTable
        rowHover
        responsiveLayout="scroll"
        header={header && tblHeader}
        removableSort
        value={data}
        className="datatable-responsive"
        emptyMessage="Không có dữ liệu."
        paginator={paginator}
        lazy={lazy}
        first={skip}
        rowsPerPageOptions={[10, 20, 50]}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="{totalRecords} bản ghi"
        totalRecords={total}
        rows={take}
        onPage={setPaging}
        selection={selected}
        onSelectionChange={(e) => setSelected && setSelected(e.value)}
        {...config}
      >
        {selected && setSelected && (
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
        )}
        {column.map((item) => (
          <Column
            headerStyle={{ width: item.width }}
            key={item.value}
            field={item.value}
            header={item.name}
            body={item.render}
            {...item}
          />
        ))}
      </DataTable>
    </>
  )
}

export default Table
