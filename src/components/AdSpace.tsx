interface AdSpaceProps {
  className?: string;
}

export const AdSpace = ({ className = "" }: AdSpaceProps) => {
  return (
    <div className={`bg-muted border border-border rounded-lg flex items-center justify-center ${className}`}>
      <p className="text-muted-foreground text-sm">Espaço Publicitário</p>
    </div>
  );
};
