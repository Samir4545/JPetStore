﻿'Dim jBrowser, jPage
'Set jBrowser= Browser("name:=JPetStore Demo.*")
'Set jPage=Page("title:=JPetStore Demo.*")
'URL="https://jpetstore.aspectran.com"
'SystemUtil.Run "Chrome",URL

Services.StartTransaction "Delete"'-------------start of transaction

Browser("JPetStore Demo").Page("JPetStore Demo").WebElement("You have placed no orders.").Click
With Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*")
	.Link("width:=75").Click
	.Link("width:=35").Click
	.WebButton("outertext:=Delete Order").Click
End With
With Browser("JPetStore Demo")
	.Page("JPetStore Demo").Link("?").Click
	With .Page("JPetStore Demo_2")
		.Link("Reviewing an Order").Click
		.Sync'------------sync point
		Browser("JPetStore Demo").Back
		.Sync'-----------sync point
	End With
	.Back
	.Page("JPetStore Demo").WebElement("You have placed no orders.").Click
End With
With Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*")
	.Link("width:=75").Click
	.Link("width:=35").Click
	.WebButton("outertext:=Delete Order").Click
End With

Services.EndTransaction "Delete"'----------------End of trnsaction

