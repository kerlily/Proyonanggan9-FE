import Image from "next/image";

interface GuruCardProps {
  nama: string;
  jabatan: string;
  imageUrl: string;
}

const GuruCard: React.FC<GuruCardProps> = ({ nama, jabatan, imageUrl }) => {
  return (
    <div className="bg-white dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col items-center p-4">
      {/* Foto */}
      <div className="relative w-full aspect-[3/4] max-w-[200px] rounded-lg overflow-hidden mb-4">
        <Image
          src={imageUrl}
          alt={nama}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
        {nama}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
        {jabatan}
      </p>
    </div>
  );
};

export default GuruCard;
