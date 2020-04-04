$(function () {
  var _apiUrl = "https://localhost:44363/";

  $("#gridContainer").dxDataGrid({
    showBorders: true,
    filterRow: { visible: true },
    searchPanel: { visible: true },
    dataSource: {
      store: {
        type: "odata",
        version: 4,
        url: _apiUrl + "odata/vehicles",
        key: "Id",
        keyType: { Id: "Guid" },
        beforeSend: function (e) {
          if (e.method == "PATCH") {
            e.method = "PUT";
          }
        },
      },
      // filter: ["Product_Current_Inventory", ">", 0],
    },
    onRowUpdating: function (options) {
      options.newData = $.extend({}, options.oldData, options.newData);
    },
    columns: [
      {
        dataField: "PlateNumber",
        width: 250,
      },
      {
        dataField: "BrandId",
        caption: "Brand",
        width: 250,
        dataType: "Guid",
        lookup: {
          dataSource: new DevExpress.data.ODataStore({
            type: "odata",
            version: 4,
            url: _apiUrl + "odata/brands",
            key: "Id",
            keyType: "Guid",
          }),
          displayExpr: "BrandName",
          valueExpr: "Id",
        },
      },
      {
        dataField: "ModelId",
        caption: "Model",
        dataType: "Guid",
        lookup: {
          dataSource: new DevExpress.data.ODataStore({
            type: "odata",
            version: 4,
            url: _apiUrl + "odata/models",
            key: "Id",
            keyType: "Guid",
          }),
          displayExpr: "ModelName",
          valueExpr: "Id",
        },
        width: 250,
      },
      {
        dataField: "Age",
        width: 250,
      },
    ],
    editing: {
      mode: "form",
      allowAdding: true,
      allowUpdating: true,
      allowDeleting: true,
    },
    paging: {
      pageSize: 2,
    },
  });
});
