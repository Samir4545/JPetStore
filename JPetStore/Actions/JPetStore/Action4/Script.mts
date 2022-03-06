Dim jBrowser, jPage
Set jBrowser= Browser("name:=JPetStore Demo")
Set jPage=Page("title:=JPetStore Demo")
URL="https://jpetstore.aspectran.com"
SystemUtil.Run "Chrome",URL


'-----Add to cart------

With Browser("JPetStore Demo")
	.Page("JPetStore Demo_4").Link("Add to Cart").Click
	Services.StartTransaction "Quantity"
	With .Page("JPetStore Demo_5")
		.WebNumber("EST-6").Set "3"
		Services.EndTransaction "Quantity"
		Services.StartTransaction "Update"
		.WebButton("Update Cart").Click
		Services.EndTransaction "Update"
		.Link("Remove").Click
		'Browser.link("class:=button").Click
		.Link("Return to Main Menu").Click
	End With
	.Page("JPetStore Demo").Image("cart").Click
End With
'Browser.WebNumber("xpath:=//DIV[@id="CenterForm"]/DIV/A[normalize-space()="Add to Cart"]").Click
'Browser.WebButton("class:=button").Click
'Browser.Link("class:=button").Click


'Sync Point
With Browser("JPetStore Demo")
	With .Page("JPetStore Demo_5")
		.WebButton("Update Cart").WaitProperty "visible", true, 2000
		.WebNumber("EST-6").WaitProperty "default value", "2", 5000
	End With


	'custom check point 

	.Page("JPetStore Demo.*").WebNumber("EST-6").Output CheckPoint("EST-6")
	With .Page("JPetStore Demo_5")
		.WebElement("$18.50").Output CheckPoint("$18.50")
		.WebTable("Item ID").Output CheckPoint("Item ID")
		.WebElement("K9-BD-01").Output CheckPoint("K9-BD-01")
		.WebElement("$55.50").Output CheckPoint("$55.50")
	End With
	.Page("$1461.60").Output CheckPoint("$1461.60")
End With
ak = DataTable.Value("validation")
If ak="True" Then
	Reporter.ReportEvent micPass, "validation done", "Sub price of pets & per local price"
	
  	Else
  	Reporter.ReportEvent  micFail,"total_price","total price is incorrect"
  	
  End If


'Standard Output Value Checkpoint
With Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*")
	.Link("Add to Cart").Output CheckPoint("Add to Cart")
	.Link("Remove").Output CheckPoint("Remove")
	.Link("Return to Main Menu").Output CheckPoint("Return to Main Menu")
	.WebElement("img_cart").Output CheckPoint("img_cart")
End With

'bitmap checkpoint

Browser("JPetStore Demo").Page("JPetStore Demo").WebElement("JPetStore Demo").Check CheckPoint("JPetStore Demo")
