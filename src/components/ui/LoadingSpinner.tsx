export const LoadingSpinner = ({ size = 24 }: { size?: number }) => (
  <div
    className="animate-spin rounded-full border-2 border-current border-t-transparent"
    style={{ width: size, height: size }}
  />
);
