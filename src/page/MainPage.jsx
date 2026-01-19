// src/page/MainPage.jsx
import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import SectorCard from '../components/report/SectorCard';
import TrendCard from '../components/report/TrendCard';
import StockDetailModal from '../components/report/StockDetailModal';

export default function MainPage() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);

  const todayDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  // 오늘의 주요 뉴스 트렌드 (임시 데이터)
  const trends = [
    { keyword: 'AI 반도체 수요 급증', newsCount: 15 },
    { keyword: '연준 금리 동결 시사', newsCount: 8 },
    { keyword: '중국 전기차 시장 회복', newsCount: 5 }
  ];

  // 섹터별 인사이트 데이터 (임시 데이터)
  const sectors = [
    {
      sectorName: '반도체 장비',
      probability: '높음',
      order: 2,
      stocks: [
        {
          ticker: 'ASML',
          name: 'ASML',
          reasons: [
            'AI 반도체 생산 증가로 EUV 장비 수요 급증 예상',
            '과거 2023년 반도체 붐 때 NVIDIA 상승 후 3개월간 45% 상승',
            '최근 실적 발표에서 수주 증가 시사'
          ],
          detailedReasons: [
            {
              title: 'AI 반도체 생산 증가로 EUV 장비 수요 급증',
              description: 'NVIDIA, AMD 등 주요 AI 칩 제조사들의 생산 증설로 인해 초미세 공정에 필수적인 EUV(극자외선) 노광 장비 수요가 급증하고 있습니다. ASML은 EUV 장비 시장을 독점하고 있어 직접적인 수혜가 예상됩니다.',
              data: '2024년 Q4 EUV 장비 수주액 전년 대비 89% 증가 (€45억)'
            },
            {
              title: '과거 유사 상황에서의 높은 수익률',
              description: '2023년 1월~4월 AI 반도체 붐 당시, NVIDIA 주가 상승 이후 ASML은 약 3개월간 45% 상승했습니다. 현재 상황이 당시와 유사한 패턴을 보이고 있어 주목이 필요합니다.',
              data: '2023.01.15 $550 → 2023.04.20 $798 (45.1% 상승)'
            },
            {
              title: '최근 실적 발표에서 긍정적 가이던스',
              description: '2024년 12월 실적 발표에서 CEO는 2025년 수주액이 전년 대비 25% 이상 증가할 것으로 전망했으며, 특히 AI 관련 수요가 예상을 초과하고 있다고 밝혔습니다.',
              data: '2025년 예상 매출 €280억 (애널리스트 컨센서스 €265억 대비 5.7% 상회)'
            }
          ],
          relatedNews: [
            {
              title: 'ASML, 2025년 EUV 장비 수주 목표 25% 상향 조정',
              summary: 'AI 칩 생산 증가로 인한 수요 급증에 따라 연간 수주 목표를 상향 조정. CEO는 "현재 수요는 공급 능력을 초과하고 있다"고 언급',
              source: 'Bloomberg',
              date: '2026.01.15',
              url: 'https://www.bloomberg.com'
            },
            {
              title: 'TSMC, 미국 애리조나 공장에 ASML EUV 장비 50대 추가 도입',
              summary: 'TSMC가 AI 칩 생산을 위해 미국 공장에 약 $75억 규모의 EUV 장비를 추가 도입하기로 결정. ASML 수주 잔고 사상 최고치 경신',
              source: 'Reuters',
              date: '2026.01.12',
              url: 'https://www.reuters.com'
            },
            {
              title: 'JP모건, ASML 목표주가 20% 상향... "AI 슈퍼사이클 수혜주"',
              summary: 'JP모건 애널리스트는 ASML을 AI 반도체 장비 분야 최선호주로 선정하며 목표주가를 $950로 상향. 향후 2년간 연평균 30% 성장 전망',
              source: 'CNBC',
              date: '2026.01.10',
              url: 'https://www.cnbc.com'
            }
          ],
          historicalCase: {
            event: '2023년 AI 반도체 붐',
            period: '2023년 1월 ~ 4월 (약 3개월)',
            priceChange: '$550 → $798 (45.1% 상승)',
            analysis: 'ChatGPT 열풍으로 AI 반도체 수요가 폭발하면서 NVIDIA가 급등했고, 약 2주 후부터 ASML 등 반도체 장비주가 강한 상승세를 보였습니다. 당시 패턴과 현재 상황이 매우 유사합니다.'
          },
          risks: [
            '중국 정부의 반도체 장비 수출 규제 강화 가능성',
            '반도체 업황 사이클 변화에 따른 수요 감소 리스크',
            '높은 밸류에이션 (P/E 35배, 업종 평균 대비 40% 프리미엄)'
          ]
        },
        {
          ticker: 'AMAT',
          name: 'Applied Materials',
          reasons: [
            '반도체 공정 장비 선두 기업',
            'AI 칩 생산에 필수적인 증착/식각 장비 공급',
            '삼성/TSMC 증설 계획과 직접 연관'
          ],
          detailedReasons: [
            {
              title: '반도체 공정 장비 시장 점유율 1위',
              description: 'Applied Materials는 증착, 식각, 검사 장비 분야에서 글로벌 1위 기업입니다. AI 칩 생산에 필수적인 고급 공정 장비를 독점적으로 공급하고 있습니다.',
              data: '글로벌 반도체 장비 시장 점유율 22% (1위)'
            },
            {
              title: 'AI 칩 생산 증설과 직접 연계',
              description: '삼성전자와 TSMC의 AI 칩 생산 라인 증설 계획에 따라 대규모 장비 수주가 예상됩니다.',
              data: '2025년 예상 수주액 $280억 (전년 대비 35% 증가)'
            }
          ],
          relatedNews: [
            {
              title: 'Applied Materials, AI 칩 장비 부문 매출 40% 급증',
              summary: '최근 분기 실적에서 AI 관련 장비 매출이 전년 대비 40% 급증. 2025년에도 강한 성장세 전망',
              source: 'Wall Street Journal',
              date: '2026.01.14',
              url: 'https://www.wsj.com'
            }
          ],
          historicalCase: {
            event: '2020년 5G 반도체 붐',
            period: '2020년 3월 ~ 8월 (약 5개월)',
            priceChange: '$48 → $78 (62.5% 상승)',
            analysis: '5G 통신 칩 수요 급증 시 반도체 장비 수요도 함께 증가하며 큰 폭의 상승을 기록했습니다.'
          },
          risks: [
            '반도체 업황 사이클에 따른 변동성',
            '중국 매출 비중 높아 지정학적 리스크 존재 (30%)'
          ]
        },
        {
          ticker: '8035.T',
          name: 'Tokyo Electron',
          reasons: [
            '일본 대표 반도체 장비 기업',
            '메모리 반도체 장비 강점, AI 서버용 HBM 수요 증가'
          ],
          detailedReasons: [
            {
              title: 'HBM(고대역폭 메모리) 제조 장비 강자',
              description: 'AI 서버에 필수적인 HBM 메모리 생산 장비에서 강점을 보유. SK하이닉스, 삼성의 HBM 증설로 수혜 예상',
              data: 'HBM 장비 시장 점유율 45% (1위)'
            }
          ],
          relatedNews: [
            {
              title: 'SK하이닉스, HBM 생산 라인 확대... Tokyo Electron 장비 도입',
              summary: 'SK하이닉스가 HBM3E 생산을 위해 Tokyo Electron 장비 대량 발주',
              source: 'Nikkei Asia',
              date: '2026.01.13',
              url: 'https://asia.nikkei.com'
            }
          ],
          historicalCase: null,
          risks: [
            '엔화 강세 시 수익성 악화 가능성',
            '메모리 반도체 경기 민감도 높음'
          ]
        }
      ]
    },
    {
      sectorName: '클라우드 인프라',
      probability: '중상',
      order: 2,
      stocks: [
        {
          ticker: 'DLR',
          name: 'Digital Realty',
          reasons: [
            'AI 데이터센터 수요 급증',
            '과거 2021년 클라우드 확장기에 안정적 우상향',
            '오늘 뉴스: MS, Google의 데이터센터 확장 계획 발표'
          ],
          detailedReasons: [
            {
              title: 'AI 워크로드 증가로 데이터센터 수요 폭발',
              description: 'ChatGPT, Claude 등 생성형 AI 서비스 확산으로 고성능 데이터센터 수요가 급증하고 있습니다. Digital Realty는 글로벌 주요 도시에 300개 이상의 데이터센터를 보유한 선두 기업입니다.',
              data: '2024년 AI 관련 신규 계약 $15억 (전년 대비 280% 증가)'
            },
            {
              title: '안정적인 배당 수익 + 성장성',
              description: 'REIT 특성상 안정적인 배당(현재 배당수익률 3.8%)을 제공하면서도 AI 데이터센터 수요 증가로 성장성도 함께 확보',
              data: '연평균 배당 성장률 5.2% (최근 5년)'
            }
          ],
          relatedNews: [
            {
              title: 'Microsoft, Digital Realty와 10년 장기 계약 체결',
              summary: 'MS가 Azure AI 서비스 확대를 위해 Digital Realty 데이터센터 장기 임대 계약 체결. 총 규모 $30억 추정',
              source: 'Reuters',
              date: '2026.01.16',
              url: 'https://www.reuters.com'
            },
            {
              title: 'Google, 유럽 AI 데이터센터 확충... Digital Realty 협력',
              summary: 'Google이 유럽 지역 AI 서비스 강화를 위해 Digital Realty와 파트너십 체결',
              source: 'Financial Times',
              date: '2026.01.15',
              url: 'https://www.ft.com'
            }
          ],
          historicalCase: {
            event: '2021년 클라우드 확장기',
            period: '2021년 1월 ~ 12월 (약 1년)',
            priceChange: '$142 → $178 (25.4% 상승)',
            analysis: '코로나19로 인한 디지털 전환 가속화로 클라우드 수요가 급증하면서 데이터센터 REITs가 안정적인 상승세를 보였습니다.'
          },
          risks: [
            '금리 상승 시 REIT 섹터 전반 약세 가능성',
            '전력 비용 상승 리스크',
            '경쟁 심화 (신규 데이터센터 공급 증가)'
          ]
        },
        {
          ticker: 'EQIX',
          name: 'Equinix',
          reasons: [
            '글로벌 데이터센터 1위 기업',
            'AI 워크로드 증가로 코로케이션 수요 증가'
          ],
          detailedReasons: [
            {
              title: '글로벌 데이터센터 네트워크 1위',
              description: 'Equinix는 전 세계 70개 도시에서 250개 이상의 데이터센터를 운영하는 업계 1위 기업입니다.',
              data: '글로벌 시장 점유율 15% (1위)'
            }
          ],
          relatedNews: [
            {
              title: 'Equinix, AI 전용 데이터센터 5개 신설 발표',
              summary: 'AI 워크로드 특화 고성능 데이터센터를 미국, 유럽, 아시아에 신설 예정',
              source: 'Bloomberg',
              date: '2026.01.14',
              url: 'https://www.bloomberg.com'
            }
          ],
          historicalCase: {
            event: '2020년 클라우드 전환기',
            period: '2020년 3월 ~ 12월 (약 9개월)',
            priceChange: '$550 → $750 (36.4% 상승)',
            analysis: '기업들의 클라우드 전환 가속화로 코로케이션 수요가 급증하며 큰 폭의 상승을 기록했습니다.'
          },
          risks: [
            '금리 민감도 높음 (REIT)',
            '자본 지출 부담 증가'
          ]
        }
      ]
    },
    {
      sectorName: '전력/유틸리티',
      probability: '중',
      order: 3,
      stocks: [
        {
          ticker: 'NEE',
          name: 'NextEra Energy',
          reasons: [
            'AI 데이터센터 전력 소비 급증 (연관 효과)',
            '재생에너지 중심, ESG 트렌드 부합',
            '안정적 유틸리티 + 성장성 조합'
          ],
          detailedReasons: [
            {
              title: 'AI 데이터센터 전력 수요 급증',
              description: 'AI 모델 학습과 추론에 필요한 GPU 서버는 일반 서버 대비 10배 이상의 전력을 소비합니다. 데이터센터 밀집 지역의 전력 수요가 폭발적으로 증가하고 있습니다.',
              data: '미국 데이터센터 전력 수요 2025년 전년 대비 28% 증가 전망'
            },
            {
              title: '재생에너지 중심 포트폴리오',
              description: 'NextEra Energy는 풍력, 태양광 등 재생에너지 발전 설비를 미국 최대 규모로 보유. ESG 투자 트렌드에 부합',
              data: '재생에너지 발전 용량 30GW (미국 1위)'
            }
          ],
          relatedNews: [
            {
              title: 'NextEra, 데이터센터 전용 전력 공급 계약 체결 러시',
              summary: 'AI 데이터센터 운영사들과 장기 전력 공급 계약 체결. 향후 5년간 안정적 수익 확보',
              source: 'Wall Street Journal',
              date: '2026.01.11',
              url: 'https://www.wsj.com'
            }
          ],
          historicalCase: {
            event: '2020년 ESG 투자 붐',
            period: '2020년 1월 ~ 2021년 12월 (약 2년)',
            priceChange: '$240 → $380 (58.3% 상승)',
            analysis: 'ESG 투자 트렌드와 재생에너지 정책 강화로 안정적인 우상향을 기록했습니다.'
          },
          risks: [
            '규제 변화에 따른 수익성 변동',
            '재생에너지 보조금 축소 가능성',
            '전통 유틸리티 대비 높은 밸류에이션'
          ]
        }
      ]
    },
    {
      sectorName: 'AI 반도체',
      probability: '높음',
      order: 1,
      stocks: [
        {
          ticker: 'NVDA',
          name: 'NVIDIA',
          reasons: [
            '현재 AI 반도체 시장 점유율 80% 이상',
            '데이터센터 매출 전년 대비 200% 이상 성장',
            '오늘 뉴스: 차세대 GPU 아키텍처 발표 예정'
          ],
          detailedReasons: [
            {
              title: 'AI 반도체 시장 독점적 지위',
              description: 'NVIDIA는 AI 학습 및 추론에 사용되는 GPU 시장에서 80% 이상의 압도적 점유율을 보유하고 있습니다. ChatGPT, Claude 등 주요 AI 서비스가 모두 NVIDIA GPU를 사용합니다.',
              data: 'AI GPU 시장 점유율 83% (2024년 기준)'
            },
            {
              title: '폭발적인 데이터센터 매출 성장',
              description: '생성형 AI 붐으로 인해 데이터센터 부문 매출이 전년 대비 217% 급증했습니다. 2025년에도 높은 성장세가 지속될 전망입니다.',
              data: '2024년 Q4 데이터센터 매출 $184억 (전년 대비 +217%)'
            },
            {
              title: '차세대 아키텍처 발표 예정',
              description: '오늘 발표될 Blackwell Ultra 아키텍처는 현재 H100 대비 성능이 2.5배 향상되어 AI 모델 학습 비용을 크게 절감할 것으로 예상됩니다.',
              data: 'Blackwell Ultra 예상 판매가 $40,000/개 (H100 대비 30% 상승)'
            }
          ],
          relatedNews: [
            {
              title: 'NVIDIA, Blackwell Ultra 아키텍처 오늘 공개... 성능 2.5배 향상',
              summary: '차세대 AI GPU 아키텍처 발표 예정. OpenAI, Google, Meta 등 주요 고객사 선주문 쇄도',
              source: 'Bloomberg',
              date: '2026.01.19',
              url: 'https://www.bloomberg.com'
            },
            {
              title: 'OpenAI, NVIDIA GPU 10만개 추가 구매 계약',
              summary: 'ChatGPT 서비스 확대를 위해 약 $40억 규모의 GPU 구매 계약 체결',
              source: 'Reuters',
              date: '2026.01.17',
              url: 'https://www.reuters.com'
            },
            {
              title: 'Morgan Stanley, NVIDIA 목표주가 $180 상향',
              summary: 'AI 수요 지속 증가로 목표주가 25% 상향. 향후 18개월 상승 여력 충분',
              source: 'CNBC',
              date: '2026.01.16',
              url: 'https://www.cnbc.com'
            }
          ],
          historicalCase: {
            event: '2023년 ChatGPT 출시 후 AI 붐',
            period: '2023년 1월 ~ 7월 (약 6개월)',
            priceChange: '$143 → $470 (229% 상승)',
            analysis: 'ChatGPT의 폭발적 인기로 AI 반도체 수요가 급증하면서 6개월 만에 3배 이상 상승했습니다. 현재도 AI 수요는 공급을 초과하는 상황입니다.'
          },
          risks: [
            '극도로 높은 밸류에이션 (P/E 60배 이상)',
            'AMD, Google(TPU) 등 경쟁사 추격',
            '미국-중국 반도체 규제 강화 리스크',
            '고객사(빅테크)의 자체 칩 개발 가능성'
          ]
        },
        {
          ticker: 'AMD',
          name: 'AMD',
          reasons: [
            'NVIDIA 대항마로 AI 가속기 시장 점유율 확대',
            'MI300 시리즈로 엔터프라이즈 시장 공략'
          ],
          detailedReasons: [
            {
              title: 'AI 가속기 시장 2위 도약',
              description: 'AMD는 MI300 시리즈를 통해 NVIDIA 독점 구도에 균열을 내고 있습니다. 특히 가격 경쟁력으로 기업 고객 확보 중',
              data: 'AI GPU 시장 점유율 10% 돌파 (2024년 5% → 2025년 예상 12%)'
            }
          ],
          relatedNews: [
            {
              title: 'Microsoft, AMD MI300 GPU 대량 도입 결정',
              summary: 'Azure AI 서비스에 AMD GPU 도입. NVIDIA 의존도 낮추기 위한 전략',
              source: 'The Verge',
              date: '2026.01.15',
              url: 'https://www.theverge.com'
            }
          ],
          historicalCase: null,
          risks: [
            'NVIDIA 대비 생태계 부족 (소프트웨어, 개발자 커뮤니티)',
            '후발주자로서 브랜드 인지도 약세'
          ]
        }
      ]
    }
  ];

  const handleStockClick = (stock, sector) => {
    setSelectedStock(stock);
    setSelectedSector(sector);
  };

  const closeModal = () => {
    setSelectedStock(null);
    setSelectedSector(null);
  };

  const handleEmailSubscribe = () => {
    console.log('이메일 구독 신청');
    window.location.href = '/mypage';
  };

  return (
    <MainLayout>
      {/* 페이지 헤더 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📊 일간 섹터 인사이트 리포트
        </h1>
        <p className="text-sm text-gray-500">{todayDate}</p>
      </div>

      {/* 구분선 */}
      <div className="border-t-2 border-gray-300 mb-6"></div>

      {/* 오늘의 주요 뉴스 트렌드 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          [오늘의 주요 뉴스 트렌드]
        </h2>
        <div className="space-y-1">
          {trends.map((trend, index) => (
            <TrendCard 
              key={index}
              keyword={trend.keyword}
              newsCount={trend.newsCount}
            />
          ))}
        </div>
      </div>

      {/* 구분선 */}
      <div className="border-t-2 border-gray-300 mb-6"></div>

      {/* 주목할 섹터 분석 */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          [주목할 섹터 분석]
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          ※ 상승 가능성 높은 순으로 정렬
        </p>
      </div>

      {/* 섹터 카드 리스트 */}
      <div className="space-y-6">
        {sectors
          .sort((a, b) => {
            const order = { '높음': 1, '중상': 2, '중': 3, '낮음': 4 };
            return order[a.probability] - order[b.probability];
          })
          .map((sector, index) => (
            <SectorCard
              key={index}
              sectorName={sector.sectorName}
              probability={sector.probability}
              order={sector.order}
              stocks={sector.stocks}
              onStockClick={(stock) => handleStockClick(stock, sector)}
            />
          ))}
      </div>

      {/* 액션 유도 섹션 */}
      <div className="mt-12 mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">
            매일 아침 인사이트를 받아보세요
          </h3>
          <p className="text-blue-100 mb-6">
            전일 분석 결과를 매일 아침 이메일로 받아보실 수 있습니다.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={handleEmailSubscribe}
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              이메일 알림 받기
            </button>
            <a 
              href="/mypage"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg transition-colors"
            >
              설정 관리
            </a>
          </div>
        </div>
      </div>

      {/* 면책 문구 */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          ⚠️ 본 서비스는 투자 참고 정보를 제공하며, 투자 판단의 책임은 사용자에게 있습니다.
        </p>
      </div>

      {/* 모달 */}
      {selectedStock && selectedSector && (
        <StockDetailModal
          stock={selectedStock}
          sector={selectedSector}
          onClose={closeModal}
        />
      )}
    </MainLayout>
  );
}