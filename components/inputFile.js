export default function File({ className }) {
  return (
    <fieldset
      className={`flex flex-col w-full space-y-2 md:space-y-1 vw:space-y-[.208vw] ${className}`}
    >
      <p
        className={`block font-bold opacity-80 text-base md:text-[20px] vw:text-[1.0416vw] leading-[1.5]`}
      >
        Upload Attachment
      </p>

      <input
        type="file"
        id="file"
        className="hidden"
        accept=".txt,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      />

      <label
        htmlFor="file"
        className="outline-none bg-transparent border-[.5px] border-[#EAEBEF]
        w-full block py-[30px] vw:py-[1.5625vw] px-5 vw:px-[1.0416vw] opacity-80 text-base md:text-[20px] vw:text-[1.0416vw] leading-[1.5]
        placeholder:text-[#EAEBEF] resize-none cursor-pointer"
      >
        <p className="text-base md:text-[20px] vw:text-[1.0416vw] leading-[1.5] opacity-80 underline mb-1 vw:mb-[.208vw]">
          Click here to upload attachment
        </p>

        <p className="text-base md:text-[20px] vw:text-[1.0416vw] leading-[1.5] opacity-80">
          supports .pdf, .doc, .docx, .rtf, .wp or .txt file
        </p>
      </label>
    </fieldset>
  )
}
