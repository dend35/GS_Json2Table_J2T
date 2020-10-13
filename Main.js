var Url;
var BearerToken;
function MyFunction() {
  Url = GetUrl();
  BearerToken = GetToken();
  var Methods = GetMethods();
	for (var i = 0; i < Methods.length; i++) {
		FillDictionary(Methods[i], Url, BearerToken);
	}
}

function GetMethods(){
  return [
	{
		Method: "Order/GetFiltered",
		List: "Заказы",
		Fileds: [
			{ alias: "Id", property: "Id" },
			{ alias: "Клиент", property: "Client.Id", prefix: Url + "Client/Edit/" },
            { alias: "Контакты клиента", property: "ClientPhoneInfosToString", type: "Phone" },
			{ alias: "Город", property: "City.Name" },
			{ alias: "Продукт", property: "ProductName" },
			{ alias: "Статус заказа", property: "OrderStatusToString" },
			{ alias: "Дата оплаты", property: "PlannedPaymentDate", type: "Date" },
			{ alias: "Дата и время создания", property: "CreatedOnMsk", type: "Date" },
			{ alias: "Менеджер", property: "Responsible.Name" },
			{ alias: "Сумма заказа", property: "ProductPrice" }
		]
	},
	{
		Method: "Webinar/GetFiltered",
		List: "Вебинары",
		Fileds: [
			{ alias: "Id", property: "Id" },
			{ alias: "Ссылка на вебинар", property: "Id", prefix: Url + "Webinar/Edit/" },
			{ alias: "Название", property: "Name" },
			{ alias: "Длительность вебинара в минутах", property: "Duration" },
			{ alias: "Число зарегистрированных", property: "CountRegistered" },
			{ alias: "Пришло на вебинар", property: "CountVisited" },
			{ alias: "Единовременный максимум", property: "TotalViewers" },
			{ alias: "Кликов на кнопку", property: "CountLinkClicked" },
			{ alias: "Кликов на баннер", property: "CountBannerClicked" },
			{ alias: "События", property: "MarketingEventCount" },
			{ alias: "Дата и время создания", property: "CreatedOnMsk", type: "Date" },
			{ alias: "Средний процент просмотра", property: "AveragePercentage" },
		]
	},
	{
		Method: "Product/GetFiltered",
		List: "Продукты",
		Fileds: [
			{ alias: "Id", property: "Id" },
			{ alias: "Название", property: "Name" },
			{ alias: "Описание", property: "Description" },
			{ alias: "Цена", property: "Price" },
		]
	}
];
}