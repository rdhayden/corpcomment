type HashtagItemProps = {
  companyName: string;
  onSelectCompany: (company: string) => void;
};

export default function HashtagItem({
  companyName,
  onSelectCompany,
}: HashtagItemProps) {
  return (
    <li key={companyName}>
      <button onClick={() => onSelectCompany(companyName)}>
        #{companyName}
      </button>
    </li>
  );
}
