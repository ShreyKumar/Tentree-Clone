import bCorpBadge from '~/assets/b-corp.png'
import climateNeutralBadge from '~/assets/climate-neutral.png'
import restorativeCoalitionBadge from '~/assets/restorative-coalition.png'
import scienceTargetsBadge from '~/assets/science-targets.png'

const badges = [
    {
        imageUrl: bCorpBadge,
        altText: 'B Corp Certified'
    },
    {
        imageUrl: climateNeutralBadge,
        altText: 'Climate Neutral Certified'
    },
    {
        imageUrl: scienceTargetsBadge,
        altText: '1% for the Planet'
    },
    {
        imageUrl: restorativeCoalitionBadge,
        altText: "Restorative Coalition"
    }
];

const CertifiedBadges = () => {
    return (
        <div className="certified-badges-container">
            <div className="badges">
                {badges.map((badge) => (
                    <img src={badge.imageUrl} alt={badge.altText} className="mb-6" />
                ))}
            </div>
        </div>
    );
};

export default CertifiedBadges