Dim jBrowser, jPage
Set jBrowser= Browser("name:=JPetStore Demo.*")
Set jPage=Page("title:=JPetStore Demo.*")
URL="https://jpetstore.aspectran.com"
SystemUtil.Run "Chrome",URL

Services.StartTransaction "Delete"'-------------start of transaction

Browser("JPetStore Demo").Page("JPetStore Demo").WebElement("You have placed no orders.").Click @@ script infofile_;_ZIP::ssf5.xml_;_
With Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*")
	.Link("width:=75").Click
	.Link("width:=35").Click
	.WebButton("outertext:=Delete Order").Click
End With
With Browser("JPetStore Demo")
	.Page("JPetStore Demo").Link("?").Click @@ script infofile_;_ZIP::ssf1.xml_;_
	With .Page("JPetStore Demo_2")
		.Link("Reviewing an Order").Click @@ script infofile_;_ZIP::ssf2.xml_;_
		.Sync'------------sync point
		Browser("JPetStore Demo").Back @@ hightlight id_;_2689032_;_script infofile_;_ZIP::ssf3.xml_;_
		.Sync'-----------sync point
	End With
	.Back @@ hightlight id_;_2689032_;_script infofile_;_ZIP::ssf4.xml_;_
	.Page("JPetStore Demo").WebElement("You have placed no orders.").Click @@ script infofile_;_ZIP::ssf5.xml_;_
End With
With Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*")
	.Link("width:=75").Click
	.Link("width:=35").Click
	.WebButton("outertext:=Delete Order").Click
End With

Services.EndTransaction "Delete"'----------------End of trnsaction

