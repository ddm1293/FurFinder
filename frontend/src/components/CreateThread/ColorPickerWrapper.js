import { ColorPicker, Divider } from 'antd'

function ColorPickerWrapper ({ colorCategory, setColor, initialColor }) {
  return (
    <ColorPicker
      defaultValue = {initialColor}
      styles={{
        popupOverlayInner: {
          width: 468 + 24,
        },
      }}
      presets={[
        {
          label: 'Recommended',
          colors: [
            '#000000',
            '#000000E0',
            '#000000A6',
            '#00000073',
            '#00000040',
            '#00000026',
            '#0000001A',
            '#00000012',
            '#0000000A',
            '#00000005',
            '#F5222D',
            '#FA8C16',
            '#FADB14',
            '#8BBB11',
            '#52C41A',
            '#13A8A8',
            '#1677FF',
            '#2F54EB',
            '#722ED1',
            '#EB2F96',
            '#F5222D4D',
            '#FA8C164D',
            '#FADB144D',
            '#8BBB114D',
            '#52C41A4D',
            '#13A8A84D',
            '#1677FF4D',
            '#2F54EB4D',
            '#722ED14D',
            '#EB2F964D',
          ],
        }
      ]}
      panelRender={(panel, { components: { Picker, Presets } }) => (
        <div
          className="color-panel"
          style={{
            display: 'flex',
            width: 468,
          }}
        >
          <div style={{ width: 234 }}>
            <div
              style={{
                fontSize: 12,
                color: 'rgba(0, 0, 0, 0.88)',
                lineHeight: '20px',
                marginBottom: 8,
              }}
            >
              Pick a {colorCategory} color
            </div>
            <Picker />
          </div>
          <Divider type="vertical" style={{ height: 'auto', }} />
          <div style={{ flex: 1 }}>
            <Presets />
          </div>
        </div>
      )}
      onChangeComplete={(color) => {
        setColor(color.toRgb());
      }}
      format='rgb'
      allowClear
    />
  )
}

export default ColorPickerWrapper
