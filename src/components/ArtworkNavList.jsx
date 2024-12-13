import React from 'react';

export default function ArtworkNavList() {
    const artworks = [
        {
            title: "Heart Mountain Relocation Center, Park County, Wyoming",
            path: "/artwork/internment-camps/heart-mountain"
        },
        {
            title: "Manzanar Relocation Center, Inyo County, California",
            path: "/artwork/internment-camps/manzanar"
        },
        {
            title: "Minidoka Relocation Center, Jerome County, Idaho",
            path: "/artwork/internment-camps/minidoka"
        },
        {
            title: "Tule Lake Relocation Center, Modoc County, California",
            path: "/artwork/internment-camps/tule-lake"
        }
    ];

    return (
        <nav className="max-w-4xl mx-auto py-20 px-8">
            <h3 className="font-robotoCondensed text-2xl mb-12 uppercase tracking-wide">Internment Camp Artwork Series</h3>
            <ul className="space-y-6">
                {artworks.map((artwork, index) => (
                    <li key={index} className="font-robotoCondensed text-lg hover:text-gray-600 transition-colors">
                        <a href={artwork.path} className="block">
                            {artwork.title}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
