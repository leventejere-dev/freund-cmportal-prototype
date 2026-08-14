const mark = `${import.meta.env.BASE_URL}brand/freund.svg`

/** FREUND wordmark, used only inside the FREUND shop section. */
export default function FreundMark({ width = 128 }: { width?: number }) {
  return (
    <span className="mark" style={{ width }}>
      <img src={mark} alt="FREUND" style={{ width: '100%', display: 'block' }} />
    </span>
  )
}
