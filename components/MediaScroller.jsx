import Image from 'next/image';
import Link from 'next/link';
// import * as IoIcons from 'react-icons/io5';

const MediaScroller = ({ simillarLands }) => {
  console.log(simillarLands);
  // const { size, location, price, photos, info, installments } = land;
  // let title = `${location} - ${size?.width} ku ${size?.height}`;

  return (
    <section className="media-scroller snaps-inline">
      {simillarLands.map((land) => (
        <div className="media-item" key={land.id}>
          {/* item image & link */}
          <Link href="/page-under-making" passHref>
            <a className="image-link media-image-container">
              <Image
                src={land.photos[0]}
                alt={`${land.location} - ${land.size?.width} ku ${land.size?.height}`}
                layout="responsive"
                className="media-item-image"
              />
            </a>
          </Link>
          <div className="media-item-content">
            {`${land.location} - ${land.size?.width} ku ${land.size?.height}`}
          </div>
        </div>
      ))}
    </section>
  );
};

export default MediaScroller;
