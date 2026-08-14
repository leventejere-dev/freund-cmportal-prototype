import type { Product } from '../data/types'
import { categoryName } from '../lib/catalog'

export default function ProductSpecifications({ product }: { product: Product }) {
  const rows: Array<[string, string]> = [
    ['Cod produs (nr. articol)', product.sku],
    ['Marcă', product.brand],
    ['Categorie', categoryName(product.category)],
    ...(product.version ? ([['Versiune', product.version]] as Array<[string, string]>) : []),
    ...((product.specs ?? []).map((s) => [s.label, s.value]) as Array<[string, string]>),
    ['Unitate de măsură', 'BUC'],
    ['Pagina din catalogul FREUND', String(product.catalogNumber ?? product.catalogPage - 2)],
  ]

  return (
    <table className="spec-table">
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k}>
            <th scope="row">{k}</th>
            <td>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
