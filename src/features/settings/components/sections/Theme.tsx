<div className="flex flex-col space-y-1.5">
  <Label className={formSettingsStyles.grouptitle}>{group.lbltheme}</Label>
  <RadioGroup value={formValues.theme} onValueChange={handleThemeChange}>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="dark" id="r1" />
      <Label htmlFor="r1">{group.theme01}</Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="standard" id="r2" />
      <Label htmlFor="r2">{group.theme02}</Label>
    </div>
  </RadioGroup>
</div>;
