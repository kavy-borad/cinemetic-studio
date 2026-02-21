
export const portfolioCategories = [
    {
        title: "Wedding",
        slug: "wedding",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Pre-Wedding",
        slug: "pre-wedding",
        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Engagement",
        slug: "engagement",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Baby Shower",
        slug: "baby-shower",
        image: "https://images.unsplash.com/photo-1519689609971-55e14cb75775?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Birthday",
        slug: "birthday",
        image: "https://images.unsplash.com/photo-1530103862676-de3c9a59af38?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Corporate",
        slug: "corporate",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80"
    },
];

export const categoryImages = {
    "wedding": [
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
    ],
    "pre-wedding": [
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522673607200-1645062cd955?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?auto=format&fit=crop&w=800&q=80",
    ],
    "engagement": [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1628891395232-23c8e4346850?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
    ],
    "baby-shower": [
        "https://images.unsplash.com/photo-1519689609971-55e14cb75775?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522071901878-9d3f11a96344?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80",
    ],
    "birthday": [
        "https://images.unsplash.com/photo-1530103862676-de3c9a59af38?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    ],
    "corporate": [
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1556761175-5973ac0f968b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800&q=80",
    ]
};

export const getCategoryImages = (cat: string | undefined): string[] => {
    const catKey = cat?.toLowerCase() as keyof typeof categoryImages;
    return categoryImages[catKey] || categoryImages["wedding"];
};
