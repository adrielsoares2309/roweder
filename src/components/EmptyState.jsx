import Icon from './Icon';

export default function EmptyState({ title, text, action }) {
  return (
    <div className="empty-state">
      <Icon>inventory_2</Icon>
      <h2>{title}</h2>
      <p>{text}</p>
      {action}
    </div>
  );
}
