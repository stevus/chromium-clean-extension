Remove-Item .\extension.zip -ErrorAction Ignore
Compress-Archive .\build\* extension.zip
