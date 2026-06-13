// https://www.svgrepo.com/svg/521115/chevron-down
export const ChevronDown = (props: React.ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      // fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 13.9394L17.4696 8.46973L18.5303 9.53039L11.9999 16.0607L5.46961 9.53039L6.53027 8.46973L11.9999 13.9394Z"
        // fill="#080341"
      />
    </svg>
  )
}
// https://www.svgrepo.com/svg/521109/chevron-right
export const ChevronRight = (props: React.ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      // fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9394 12.0001L8.46973 6.53039L9.53039 5.46973L16.0607 12.0001L9.53039 18.5304L8.46973 17.4697L13.9394 12.0001Z"
        // fill="#080341"
      />
    </svg>
  )
}
// https://www.svgrepo.com/show/361085/collapse-all.svg
export const CollapseAll = (props: React.ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800px"
      height="800px"
      viewBox="0 0 16 16"
      // fill="#000000"
      {...props}
    >
      <path d="M9 9H4v1h5V9z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 3l1-1h7l1 1v7l-1 1h-2v2l-1 1H3l-1-1V6l1-1h2V3zm1 2h4l1 1v4h2V3H6v2zm4 1H3v7h7V6z"
      />
    </svg>
  )
}
// https://www.svgrepo.com/svg/361148/expand-all
export const ExpandAll = (props: React.ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800px"
      height="800px"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M9 9H4v1h5V9z" />
      <path d="M7 12V7H6v5h1z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 3l1-1h7l1 1v7l-1 1h-2v2l-1 1H3l-1-1V6l1-1h2V3zm1 2h4l1 1v4h2V3H6v2zm4 1H3v7h7V6z"
      />
    </svg>
  )
}
