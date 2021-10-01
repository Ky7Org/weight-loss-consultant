import { Select } from 'antd';
const { Option } = Select;
const SelectFiled = (props) => {
  const {
    allowClear,
    placeholder,
    defaultValue,
    onChange,
    listOption,
    disable,
  } = props;

  const renderListOption = () => {
    return listOption?.map((x) => (
      <Option key={x.id} value={x.id} label={x.id}>
        <div className="demo-option-label-item">{x.name}</div>
      </Option>
    ));
  };

  return (
    <div className="form">
      <Select
        mode="multiple"
        disabled={disable}
        style={{ width: '100%' }}
        allowClear={allowClear}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        maxTagCount="responsive"
      >
        {renderListOption()}
      </Select>
    </div>
  );
};

export default SelectFiled;
