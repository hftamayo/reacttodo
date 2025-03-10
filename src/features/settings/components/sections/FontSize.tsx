<div className="flex flex-col space-y-1.5">
  <Label className={formSettingsStyles.grouptitle} htmlFor="fontsize">
    {group.lblfsize}
  </Label>
  <Select defaultValue={initialValues.fontSize.toString()}>
    <SelectTrigger id="fontsize">
      <SelectValue placeholder={group.fsizepholder} />
    </SelectTrigger>
    <SelectContent position="popper">
      <SelectItem value="12">12</SelectItem>
      <SelectItem value="14">14</SelectItem>
      <SelectItem value="16">16</SelectItem>
      <SelectItem value="18">18</SelectItem>
    </SelectContent>
  </Select>
</div>;
