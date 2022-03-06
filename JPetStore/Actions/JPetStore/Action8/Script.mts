'Dim jBrowser, jPage
'Set jBrowser= Browser("name:=JPetStore Demo.*")
'Set jPage=Page("title:=JPetStore Demo.*")
'URL="https://jpetstore.aspectran.com"
'SystemUtil.Run "Chrome",URL


'-----Add to cart------

'jBrowser.WebNumber("xpath:=//DIV[@id="CenterForm"]/DIV/A[normalize-space()="Add to Cart"]").Click
Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*").WebButton("class:=button").Click
Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*").Link("class:=button").Click
Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*").WebElement("innertext:=Quantity").Click

Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*").WebNumber("xpath:=//TD[5]/INPUT[1]").Click

Services.StartTransaction "Quantity"
'----------No. of Quantity----- 
Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*").WebNumber("default value:=2").Click 
Services.EndTransaction "Quantity"

Services.StartTransaction "Update"
Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*").WebButton("innertext:=Update Cart").Click
Services.EndTransaction "Update"
Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*").Link("name:=Remove").Click
Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*").WebElement("outertext:=JPetStore Demo").Click
Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*").Link("innertext:=Return to Main Menu").Click
Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*").Image("name:=img_cart").Click

'Sync Point
Browser("JPetStore Demo.*").Page("JPetStore Demo.*").WebButton("Update Cart").WaitProperty "visible", true, 2000
Browser("JPetStore Demo.*").Page("JPetStore Demo.*").WebNumber("EST-6").WaitProperty "default value", "2", 5000


'custom check point 

Browser("JPetStore Demo.*").Page("JPetStore Demo.*").WebNumber("EST-6").Output CheckPoint("EST-6")
Browser("JPetStore Demo.*").Page("JPetStore Demo.*").WebElement("$18.50").Output CheckPoint("$18.50")
Browser("JPetStore Demo.*").Page("JPetStore Demo.*").WebTable("Item ID").Output CheckPoint("Item ID")
Browser("JPetStore Demo.*").Page("JPetStore Demo.*").WebElement("K9-BD-01").Output CheckPoint("K9-BD-01")
Browser("JPetStore Demo.*").Page("JPetStore Demo.*").WebElement("$55.50").Output CheckPoint("$55.50")
Browser("JPetStore Demo.*").Page("$1461.60").Output CheckPoint("$1461.60")
ak = DataTable.Value("validation")
If ak="True" Then
	Reporter.ReportEvent micPass, "validation done", "Sub price of pets & per local price"
	
  	Else
  	Reporter.ReportEvent  micFail,"total_price","total price is incorrect"
  	
  End If


'Standard Output Value Checkpoint
Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*").Link("Add to Cart").Output CheckPoint("Add to Cart")
Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*").Link("Remove").Output CheckPoint("Remove")
Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*").Link("Return to Main Menu").Output CheckPoint("Return to Main Menu")
Browser("name:=JPetStore Demo.*").Page("title:=JPetStore Demo.*").WebElement("img_cart").Output CheckPoint("img_cart")
