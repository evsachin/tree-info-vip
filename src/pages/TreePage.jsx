import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { getTreeBySlug } from "../data/trees.js";
import NotFound from "./NotFound.jsx";

export default function TreePage() {
  const { slug } = useParams();
  const tree = getTreeBySlug(slug);

  useEffect(() => {
    document.title = tree
      ? `${tree.commonName} - Tree Information`
      : "Tree Not Found";

    window.scrollTo(0, 0);
  }, [tree]);

  if (!tree) {
    return (
      <NotFound
        message="The requested tree information could not be found."
        title="Tree Not Found"
      />
    );
  }

  const organization = tree.organization;

  const mapUrl = tree.coordinates
    ? `https://www.google.com/maps?q=${tree.coordinates.lat},${tree.coordinates.lng}`
    : null;

  const treeUrl = window.location.href;
  const localName = tree.localName || tree.commonName;

  return (
    <main className="min-h-screen bg-[#e9eee1] px-0 py-0 sm:px-4 sm:py-5">
      <article className="relative mx-auto w-full max-w-[900px] overflow-hidden bg-[#f7fae9] text-[#174b31] shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
        <div className="pointer-events-none absolute left-[-8px] top-[-15px] z-10 rotate-[-25deg] text-[55px] opacity-80">
          🍃
        </div>

        <div className="pointer-events-none absolute right-[10px] top-[-20px] z-10 rotate-[25deg] text-[55px] opacity-80">
          🌿
        </div>

        <div className="pointer-events-none absolute bottom-[30px] right-[-5px] z-10 rotate-[30deg] text-[55px] opacity-80">
          🍃
        </div>

        <section className="relative z-20 w-full px-6 pb-5 pt-8 sm:w-[58%] sm:px-[50px] sm:pt-[45px]">
          <h1 className="mb-3 font-serif text-[48px] font-black leading-[0.95] text-[#064d2c] sm:text-[68px] lg:text-[78px]">
            {tree.commonName}
          </h1>

          <div className="text-[25px] font-bold italic leading-tight text-[#126238] sm:text-[36px] lg:text-[42px]">
            {tree.tagline || "The Tree of Life"}
          </div>

          <div className="relative mt-5 h-[3px] w-[90%] bg-[#55a970]">
            <span className="absolute right-1 top-[-18px] text-[28px]">🍃</span>
          </div>

          <p className="mt-5 text-[18px] font-semibold italic leading-relaxed text-[#276340] sm:text-[24px]">
            A symbol of strength, wisdom
            <br />
            and a greener tomorrow
          </p>
        </section>

        <div className="relative h-[330px] w-full overflow-hidden sm:absolute sm:right-0 sm:top-0 sm:h-[480px] sm:w-[47%] sm:rounded-bl-[120px]">
          <img
            src={tree.images?.[0]}
            alt={tree.commonName}
            className="h-full w-full object-cover"
          />
        </div>

        <section className="relative z-20 grid grid-cols-1 gap-5 px-5 pt-7 sm:grid-cols-[56%_44%] sm:px-[35px] sm:pt-[15px]">
          <div className="pt-1">
            <section className="mb-6 flex items-start gap-4">
              <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full border-2 border-[#d0e9b1] bg-[#d9f2b7] text-[31px]">
                🌳
              </div>

              <div className="flex-1">
                <h2 className="mb-1 text-[22px] font-black text-[#145b35]">
                  What is a {tree.commonName}?
                </h2>

                <p className="text-[15px] leading-[1.45] text-[#263d30]">
                  The {tree.commonName} <i>({tree.scientificName})</i> is a
                  remarkable tree known for its natural beauty, ecological
                  importance and connection with the environment.
                </p>
              </div>
            </section>

            <section className="mb-6 flex items-start gap-4">
              <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full border-2 border-[#d0e9b1] bg-[#d9f2b7] text-[31px]">
                🍃
              </div>

              <div className="flex-1">
                <h2 className="mb-1 text-[22px] font-black text-[#145b35]">
                  Key Features
                </h2>

                <ul className="list-disc space-y-1 pl-5 text-[14px] leading-[1.5] text-[#263d30]">
                  <li>Common Name: {tree.commonName}</li>
                  <li>Scientific Name: {tree.scientificName}</li>
                  <li>Family: {tree.family}</li>
                  <li>Approximate Age: {tree.age}</li>
                  <li>Height: {tree.height}</li>
                </ul>
              </div>
            </section>

            <section className="mb-6 flex items-start gap-4">
              <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full border-2 border-[#d0e9b1] bg-[#d9f2b7] text-[31px]">
                💚
              </div>

              <div className="flex-1">
                <h2 className="mb-1 text-[22px] font-black text-[#145b35]">
                  Importance
                </h2>

                <ul className="list-disc space-y-1 pl-5 text-[14px] leading-[1.5] text-[#263d30]">
                  {tree.importance?.environmental && (
                    <li>{tree.importance.environmental}</li>
                  )}

                  {tree.importance?.ecological && (
                    <li>{tree.importance.ecological}</li>
                  )}

                  {tree.importance?.wildlife && (
                    <li>{tree.importance.wildlife}</li>
                  )}
                </ul>
              </div>
            </section>

            {tree.importance?.cultural && (
              <section className="mb-6 flex items-start gap-4">
                <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full border-2 border-[#d0e9b1] bg-[#d9f2b7] text-[31px]">
                  🌱
                </div>

                <div className="flex-1">
                  <h2 className="mb-1 text-[22px] font-black text-[#145b35]">
                    Cultural Significance
                  </h2>

                  <p className="text-[15px] leading-[1.45] text-[#263d30]">
                    {tree.importance.cultural}
                  </p>
                </div>
              </section>
            )}

            {tree.importance?.medicinal && (
              <section className="mb-6 flex items-start gap-4">
                <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full border-2 border-[#d0e9b1] bg-[#d9f2b7] text-[31px]">
                  🌿
                </div>

                <div className="flex-1">
                  <h2 className="mb-1 text-[22px] font-black text-[#145b35]">
                    Traditional Uses
                  </h2>

                  <p className="text-[15px] leading-[1.45] text-[#263d30]">
                    {tree.importance.medicinal}
                  </p>
                </div>
              </section>
            )}

            <section className="mb-6 flex items-start gap-4">
              <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full border-2 border-[#d0e9b1] bg-[#d9f2b7] text-[31px]">
                🌍
              </div>

              <div className="flex-1">
                <h2 className="mb-1 text-[22px] font-black text-[#145b35]">
                  A Greener Future
                </h2>

                <p className="text-[15px] leading-[1.45] text-[#263d30]">
                  Planting and protecting {tree.commonName} trees helps build a
                  healthier environment and a more sustainable planet.
                </p>
              </div>
            </section>
          </div>

          <div className="pt-0 sm:pt-[30px]">
            <div className="relative flex min-h-[320px] items-center justify-center rounded-[20px] bg-gradient-to-br from-[#dff4c8] to-[#eef8df] p-5 sm:min-h-[370px]">
              <span className="absolute left-[15px] top-[8px] text-[30px]">
                🌿
              </span>

              <span className="absolute right-[15px] top-[8px] text-[30px]">
                🌼
              </span>

              <span className="absolute bottom-[8px] left-[15px] text-[30px]">
                🌱
              </span>

              <span className="absolute bottom-[8px] right-[15px] text-[30px]">
                🍃
              </span>

              <div className="rounded-[22px] bg-white p-5 shadow-[0_5px_20px_rgba(38,92,54,0.08)] sm:p-7">
                <QRCodeCanvas
                  value={treeUrl}
                  size={230}
                  level="H"
                  marginSize={4}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  className="h-[200px] w-[200px] sm:h-[230px] sm:w-[230px]"
                  aria-label={`QR code for ${tree.commonName}`}
                />
              </div>
            </div>

            <div className="mt-5 text-center">
              <p className="text-sm font-bold uppercase tracking-wide text-[#276340]">
                Scan to know more
              </p>

              <p className="mt-2 text-xl font-black text-[#145b35]">
                {localName}
              </p>

              <p className="text-sm italic text-[#276340]">
                {tree.scientificName}
              </p>

              <p className="mt-1 text-sm font-bold text-[#276340]">
                Tree No: {tree.treeNumber || tree.id}
              </p>
            </div>
          </div>
        </section>

        <div className="mx-[30px] mb-5 mt-7 px-5 text-center sm:text-right">
          <h2 className="text-[32px] font-black italic leading-none text-[#08703e] sm:text-[34px]">
            More Trees
            <br />
            More Life
          </h2>

          <div className="mx-auto mt-3 h-[4px] w-[180px] rotate-[-4deg] bg-[#19804d] sm:mr-0" />
        </div>

        {tree.images && tree.images.length > 0 && (
          <section className="grid grid-cols-1 gap-4 px-5 sm:grid-cols-3 sm:px-[30px]">
            {tree.images.slice(0, 3).map((image, index) => (
              <div key={`${image}-${index}`} className="text-center">
                <div className="h-[180px] overflow-hidden rounded-[10px] border-2 border-[#d5e9bf] sm:h-[120px]">
                  <img
                    src={image}
                    alt={`${tree.commonName} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>

                <p className="mt-1.5 text-[13px] font-semibold italic text-[#267044]">
                  {index === 0
                    ? `A majestic ${tree.commonName}`
                    : index === 1
                      ? "Tree details"
                      : "Tree and leaves"}
                </p>
              </div>
            ))}
          </section>
        )}

        <footer className="relative mt-8 overflow-hidden px-5 pb-8 pt-8 text-center">
          <div className="absolute bottom-2 left-[-20px] right-[-20px] h-[20px] rotate-[-3deg] bg-[#128447] opacity-80" />

          <div className="relative z-10">
            {organization?.name && (
              <>
                <div className="text-[16px] font-semibold text-[#3e684d]">
                  Concept by
                </div>

                <div className="mt-1 text-[25px] font-black text-[#126238]">
                  {organization.name}
                </div>
              </>
            )}

            {organization?.initiativeName && (
              <div className="mt-1 text-[16px] font-semibold text-[#3e684d]">
                ({organization.initiativeName})
              </div>
            )}

            {organization?.projectName && (
              <div className="mx-auto mt-3 inline-block rounded-sm bg-[#128447] px-6 py-2 text-sm font-black uppercase tracking-wide text-white">
                {organization.projectName}
              </div>
            )}
          </div>
        </footer>
      </article>
    </main>
  );
}
